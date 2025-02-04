import { ethers } from 'ethers';
import { tokenService } from './tokens';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../store/api';
import { store } from '../../store/store';

interface PriceData {
  price: number;
  timestamp: number;
  source: string;
}

interface SwapParams {
  fromToken: string;
  toToken: string;
  amount: string;
  slippage?: number;
  apiKey?: string;
}

interface LiquidityParams {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  apiKey?: string;
}

interface YieldFarmingOpportunity {
  protocol: string;
  apr: number;
  tvl: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const defiApi = createApi({
  reducerPath: 'defiApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTokenPrice: builder.query<PriceData, { tokenAddress: string; apiKey?: string }>({
      query: ({ tokenAddress, apiKey }) => ({
        url: '/defi/price',
        params: { tokenAddress, apiKey }
      })
    }),
    swapTokens: builder.mutation<ethers.TransactionResponse, SwapParams>({
      query: (params) => ({
        url: '/defi/swap',
        method: 'POST',
        body: params
      })
    }),
    addLiquidity: builder.mutation<ethers.TransactionResponse, LiquidityParams>({
      query: (params) => ({
        url: '/defi/liquidity/add',
        method: 'POST',
        body: params
      })
    }),
    removeLiquidity: builder.mutation<ethers.TransactionResponse, { lpToken: string; amount: string; apiKey?: string }>({
      query: (params) => ({
        url: '/defi/liquidity/remove',
        method: 'POST',
        body: params
      })
    }),
    getYieldFarmingOpportunities: builder.query<YieldFarmingOpportunity[], { apiKey?: string }>({
      query: ({ apiKey }) => ({
        url: '/defi/yield-farming',
        params: { apiKey }
      })
    })
  })
});

export class DeFiService {
  private static instance: DeFiService;
  private provider: ethers.Provider | null = null;
  private signer: ethers.Signer | null = null;

  private constructor() {}

  static getInstance(): DeFiService {
    if (!DeFiService.instance) {
      DeFiService.instance = new DeFiService();
    }
    return DeFiService.instance;
  }

  async initialize(provider: ethers.Provider, signer: ethers.Signer) {
    this.provider = provider;
    this.signer = signer;
    store.dispatch(defiApi.util.resetApiState());
  }

  async getTokenPrice(tokenAddress: string): Promise<PriceData> {
    const { data } = await store.dispatch(
      defiApi.endpoints.getTokenPrice.initiate({ tokenAddress })
    );
    return data!;
  }

  async swapTokens(params: SwapParams): Promise<ethers.TransactionResponse> {
    const result = await store.dispatch(
      defiApi.endpoints.swapTokens.initiate(params)
    );
    return result.data!;
  }

  async addLiquidity(params: LiquidityParams): Promise<ethers.TransactionResponse> {
    const result = await store.dispatch(
      defiApi.endpoints.addLiquidity.initiate(params)
    );
    return result.data!;
  }

  async removeLiquidity(params: { lpToken: string; amount: string; apiKey?: string }): Promise<ethers.TransactionResponse> {
    const result = await store.dispatch(
      defiApi.endpoints.removeLiquidity.initiate(params)
    );
    return result.data!;
  }

  async getYieldFarmingOpportunities(): Promise<YieldFarmingOpportunity[]> {
    const { data } = await store.dispatch(
      defiApi.endpoints.getYieldFarmingOpportunities.initiate({})
    );
    return data!;
  }
}

export const defiService = DeFiService.getInstance();
export const { useGetTokenPriceQuery, useSwapTokensMutation, useAddLiquidityMutation, useRemoveLiquidityMutation, useGetYieldFarmingOpportunitiesQuery } = defiApi;
