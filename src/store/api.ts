// Add these endpoints to the existing API
export const api = createApi({
  // ... existing configuration
  endpoints: (builder) => ({
    // ... existing endpoints
    createToken: builder.mutation({
      query: (data) => ({
        url: '/tokens',
        method: 'POST',
        body: data
      })
    }),
    createNFT: builder.mutation({
      query: (data) => ({
        url: '/nfts',
        method: 'POST',
        body: data
      })
    }),
    getLiquidityPools: builder.query({
      query: () => '/liquidity'
    }),
    getMarketplaces: builder.query({
      query: () => '/marketplaces'
    })
  })
});

export const {
  useCreateTokenMutation,
  useCreateNFTMutation,
  useGetLiquidityPoolsQuery,
  useGetMarketplacesQuery
} = api;
