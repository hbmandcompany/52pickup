'use client';

export interface DepositFlowProps {
  onComplete: () => void;
}

export function DepositFlow({ onComplete }: DepositFlowProps): React.JSX.Element {
  return (
    <div className="space-y-4 font-body text-sm text-ink-secondary">
      <p>
        Fund your embedded wallet with USDC on Base using the Coinbase Wallet
        panel. When connected, funding options appear in the global wallet menu.
      </p>
      <p className="font-mono text-xs text-ink-tertiary">
        This build uses the OnchainKit wallet UI for deposits.
      </p>
      <button
        type="button"
        onClick={onComplete}
        className="w-full rounded-button border-2 border-gold py-3 font-body font-medium text-ink transition-all duration-fast hover:bg-gold-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
      >
        Done
      </button>
    </div>
  );
}
