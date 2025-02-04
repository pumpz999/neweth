import React from 'react';
import { TokenTrading } from '../components/marketplace/TokenTrading';
import { NFTTrading } from '../components/marketplace/NFTTrading';
import { Tabs, Tab, Box } from '@mui/material';

export function Marketplace() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Token Trading" />
        <Tab label="NFT Trading" />
      </Tabs>
      
      <Box sx={{ p: 3 }}>
        {tab === 0 && <TokenTrading />}
        {tab === 1 && <NFTTrading />}
      </Box>
    </Box>
  );
}
