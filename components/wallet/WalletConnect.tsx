'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';

export interface WalletConnectProps {
  className?: string;
}

export function WalletConnect({
  className = '',
}: WalletConnectProps): React.JSX.Element {
  return (
    <div className={className}>
      <ConnectWallet />
    </div>
  );
}
