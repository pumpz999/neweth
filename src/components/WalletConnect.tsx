import React from 'react';
import { WalletState } from '../types';
import { Wallet } from 'lucide-react';
import { Button } from '@mui/material';

interface WalletConnectProps {
  walletState: WalletState;
  onConnect: () => void;
}

export function WalletConnect({ walletState, onConnect }: WalletConnectProps) {
  return (
    <div className="flex items-center gap-4">
      {walletState.isConnected ? (
        <Button
          variant="contained"
          startIcon={<Wallet />}
          sx={{
            textTransform: 'none',
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<Wallet />}
          onClick={onConnect}
          sx={{
            textTransform: 'none',
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Connect MetaMask
        </Button>
      )}
    </div>
  );
}
