import { useState, useCallback, useEffect } from 'react';
import { WalletState } from '../types';
import { ethers } from 'ethers';
import { TemplateMarketplace } from '../lib/contracts';

const MARKETPLACE_ADDRESS = "0x0000000000000000000000000000000000000000";

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    signer: null,
    marketplace: null,
  });

  const connect = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = ethers.formatEther(await provider.getBalance(address));
      
      const marketplace = new TemplateMarketplace(MARKETPLACE_ADDRESS, signer);
      
      setWalletState({
        isConnected: true,
        address,
        chainId: Number(network.chainId),
        balance,
        signer,
        marketplace,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }, []);

  const handleNetworkChange = useCallback(async (chainId: number) => {
    try {
      if (!window.ethereum) return false;
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      
      setWalletState(prev => ({ ...prev, chainId }));
      return true;
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        connect();
      } else {
        setWalletState({
          isConnected: false,
          address: null,
          chainId: null,
          balance: null,
          signer: null,
          marketplace: null,
        });
      }
    };

    const handleChainChanged = () => {
      connect();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [connect]);

  return {
    walletState,
    connect,
    handleNetworkChange,
  };
}
