'use client';

import { useVerification } from '@/hooks/useVerification';
import { Button } from '@/components/shared/Button';
import type { Card } from '@/types/game';
import { useState } from 'react';

export interface VerifyFairnessProps {
  commitHash: string;
  seed: string;
  deck: Card[];
  className?: string;
}

export function VerifyFairness({
  commitHash,
  seed,
  deck,
  className = '',
}: VerifyFairnessProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const { verified, check, reset } = useVerification();

  return (
    <div className={`font-body ${className}`}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            if (!next) reset();
            return next;
          });
        }}
        className="text-sm text-ink-secondary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
      >
        Verify this round
      </button>
      {open ? (
        <div className="mt-6 space-y-4 rounded-card border border-border bg-sand p-6">
          <div>
            <p className="text-xs uppercase tracking-label text-ink-tertiary">
              Commitment
            </p>
            <p className="mt-1 break-all font-mono text-xs text-ink">{commitHash}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-label text-ink-tertiary">
              Seed
            </p>
            <p className="mt-1 break-all font-mono text-xs text-ink">{seed}</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              void check(seed, commitHash, deck);
            }}
          >
            Reconstruct deck
          </Button>
          {verified === true ? (
            <p className="text-sm text-emerald-deep">Verified — deck was fair</p>
          ) : null}
          {verified === false ? (
            <p className="text-sm text-burgundy">Verification failed — review seed.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
