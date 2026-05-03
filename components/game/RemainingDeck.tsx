'use client';

import { rankToLabel } from '@/lib/deck';
import type { Card, Rank } from '@/types/game';

export interface RemainingDeckProps {
  deck: Card[];
  lastRevealedIndex: number;
  className?: string;
}

const RANKS: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function countUndealtByRank(deck: Card[], fromIndex: number): Record<Rank, number> {
  const acc: Record<Rank, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
  };
  for (let i = fromIndex; i < deck.length; i++) {
    const c = deck[i];
    if (c) acc[c.rank]++;
  }
  return acc;
}

export function RemainingDeck({
  deck,
  lastRevealedIndex,
  className = '',
}: RemainingDeckProps): React.JSX.Element {
  const from = lastRevealedIndex + 1;
  const counts = countUndealtByRank(deck, from);

  return (
    <div className={`rounded-card border border-border bg-white p-6 shadow-card ${className}`}>
      <p className="font-body text-sm uppercase tracking-label text-ink-secondary">
        Remaining deck
      </p>
      <div className="mt-6 flex h-24 items-end justify-between gap-1 md:gap-2">
        {RANKS.map((r) => {
          const c = counts[r];
          const h = c === 0 ? 4 : (c / 4) * 100;
          return (
            <div key={r} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-xs text-ink-tertiary">{c}</span>
              <div className="flex w-full flex-1 items-end justify-center">
                <div
                  className={`w-full max-w-[28px] rounded-t-sm ${c === 0 ? 'bg-border/50' : 'bg-gold/30'}`}
                  style={{ height: `${Math.max(h, 4)}%` }}
                />
              </div>
              <span className="font-mono text-xs text-ink-tertiary">
                {rankToLabel(r)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
