'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WalletProvider } from '@coinbase/onchainkit/wallet';
import { WALLET_CONFIG } from '@/lib/wallet-config';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps): React.JSX.Element {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  return (
    <OnchainKitProvider
      chain={WALLET_CONFIG.chain}
      apiKey={apiKey}
      config={{
        appearance: {
          name: WALLET_CONFIG.appName,
          logo: WALLET_CONFIG.appIcon,
          mode: 'light',
          theme: 'default',
        },
        wallet: {
          display: 'classic',
        },
      }}
    >
      <WalletProvider>{children}</WalletProvider>
    </OnchainKitProvider>
  );
}
