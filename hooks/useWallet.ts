import { BASE_USDC_TOKEN } from '@/lib/wallet-config';
import { useGetTokenBalance } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';

export interface UseWalletResult {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  balanceUsdDisplay: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  refetchBalance: () => void;
}

export function useWallet(): UseWalletResult {
  const { address, isConnected } = useAccount();
  const { roundedBalance, status, refetch } = useGetTokenBalance(
    address,
    BASE_USDC_TOKEN,
  );

  const balanceUsdDisplay = useMemo(() => {
    if (!isConnected || roundedBalance === undefined) return '—';
    const n = Number.parseFloat(roundedBalance);
    if (Number.isNaN(n)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }, [isConnected, roundedBalance]);

  const balanceStatus = useMemo((): UseWalletResult['status'] => {
    if (status === 'pending') return 'loading';
    if (status === 'success') return 'success';
    if (status === 'error') return 'error';
    return 'idle';
  }, [status]);

  return {
    address,
    isConnected,
    balanceUsdDisplay,
    status: balanceStatus,
    refetchBalance: () => {
      void refetch();
    },
  };
}
