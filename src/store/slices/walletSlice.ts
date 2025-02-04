import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  signer: any | null;
  marketplace: any | null;
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,
  signer: null,
  marketplace: null,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletState>) => {
      state.isConnected = action.payload.isConnected;
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.balance = action.payload.balance;
      state.signer = action.payload.signer;
      state.marketplace = action.payload.marketplace;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.chainId = null;
      state.balance = null;
      state.signer = null;
      state.marketplace = null;
    },
  },
});

export const { setWallet, disconnectWallet } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
