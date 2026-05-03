'use client';

import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { DepositFlow } from '@/components/wallet/DepositFlow';
import { WithdrawFlow } from '@/components/wallet/WithdrawFlow';
import { useWallet } from '@/hooks/useWallet';
import { useState } from 'react';

export interface BalanceDisplayProps {
  className?: string;
}

export function BalanceDisplay({
  className = '',
}: BalanceDisplayProps): React.JSX.Element {
  const { balanceUsdDisplay, refetchBalance } = useWallet();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div
      className={`flex flex-col gap-6 rounded-card border border-border bg-white p-6 shadow-card transition-shadow duration-150 hover:shadow-card-hover ${className}`}
    >
      <div>
        <p className="font-body text-sm uppercase tracking-label text-ink-secondary">
          Balance
        </p>
        <p className="mt-2 font-mono text-3xl text-ink">{balanceUsdDisplay}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button type="button" variant="primary" onClick={() => setDepositOpen(true)}>
          Deposit
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setWithdrawOpen(true)}
        >
          Withdraw
        </Button>
      </div>
      <Modal isOpen={depositOpen} onClose={() => setDepositOpen(false)} title="Deposit USDC">
        <DepositFlow onComplete={() => { setDepositOpen(false); refetchBalance(); }} />
      </Modal>
      <Modal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} title="Withdraw USDC">
        <WithdrawFlow
          onComplete={() => {
            setWithdrawOpen(false);
            refetchBalance();
          }}
        />
      </Modal>
    </div>
  );
}
