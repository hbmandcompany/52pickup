'use client';

export interface WithdrawFlowProps {
  onComplete: () => void;
}

export function WithdrawFlow({ onComplete }: WithdrawFlowProps): React.JSX.Element {
  return (
    <div className="font-body text-sm text-ink-secondary">
      <p>
        Send USDC to your external address from the Coinbase wallet interface
        when you are ready to cash out.
      </p>
      <button
        type="button"
        onClick={onComplete}
        className="mt-6 w-full rounded-button border border-border py-3 font-body text-ink-secondary transition-all hover:border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
      >
        Close
      </button>
    </div>
  );
}
