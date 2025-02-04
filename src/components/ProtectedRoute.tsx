import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWallet } from '../store/slices/walletSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const wallet = useSelector(selectWallet);

  if (!wallet.isConnected) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
