'use client';

import { rankToLabel } from '@/lib/deck';
import type { Prediction } from '@/types/game';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export interface ScoreBreakdownProps {
  predictions: Prediction[];
  className?: string;
}

export function ScoreBreakdown({
  predictions,
  className = '',
}: ScoreBreakdownProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-card border border-border bg-white shadow-card ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4 font-body text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
      >
        All predictions ({predictions.length})
        <span className="font-mono text-ink-tertiary">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <ul className="max-h-72 space-y-2 overflow-y-auto px-6 py-4 font-mono text-xs text-ink-secondary">
              {predictions.map((p) => (
                <li
                  key={p.cardIndex}
                  className="flex justify-between gap-4 border-b border-border/60 py-2 last:border-0"
                >
                  <span>
                    #{p.cardIndex} · G {rankToLabel(p.guessedRank)} / A{' '}
                    {p.actualCard.label}
                  </span>
                  <span>
                    Δ{p.distance} · {p.pointsEarned > 0 ? '+' : ''}
                    {p.pointsEarned}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
