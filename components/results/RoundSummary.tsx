'use client';

import { formatUsd } from '@/lib/format';
import { TIER_LABELS } from '@/lib/wallet-config';
import type { RoundState } from '@/types/game';

export interface RoundSummaryProps {
  round: RoundState;
  className?: string;
}

export function RoundSummary({
  round,
  className = '',
}: RoundSummaryProps): React.JSX.Element {
  const payout = round.payoutAmount ?? 0;
  const mult = round.payoutMultiplier ?? 0;

  return (
    <div
      className={`rounded-card border border-border bg-white p-8 shadow-card ${className}`}
    >
      <h2 className="font-display text-2xl text-ink">Round summary</h2>
      <dl className="mt-8 space-y-4 font-mono text-sm text-ink-secondary">
        <div className="flex justify-between">
          <dt>Final score</dt>
          <dd className="text-ink">{round.score}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Multiplier</dt>
          <dd>{mult.toFixed(2)}×</dd>
        </div>
        <div className="flex justify-between">
          <dt>Entry</dt>
          <dd>{TIER_LABELS[round.entryTier]}</dd>
        </div>
      </dl>
      <p
        className={`mt-8 text-center font-mono text-3xl ${payout > 0 ? 'text-gold' : 'text-burgundy'}`}
      >
        {formatUsd(payout)}
      </p>
    </div>
  );
}
