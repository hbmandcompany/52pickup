'use client';

import { rankToLabel } from '@/lib/deck';
import type { Prediction } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';

export interface PredictionHistoryProps {
  predictions: Prediction[];
  className?: string;
}

function entryStyle(d: number): string {
  if (d === 0) return 'bg-emerald-subtle text-emerald-deep';
  if (d >= 4) return 'bg-burgundy-subtle text-burgundy';
  if (d === 3) return 'bg-sand text-ink-secondary';
  return 'bg-white text-ink border border-border';
}

export function PredictionHistory({
  predictions,
  className = '',
}: PredictionHistoryProps): React.JSX.Element {
  const recent = predictions.slice(-12);

  return (
    <div className={`relative ${className}`}>
      <p className="mb-3 font-body text-xs uppercase tracking-label text-ink-tertiary">
        Last predictions
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        <AnimatePresence initial={false}>
          {recent.map((p) => (
            <motion.div
              key={`${p.cardIndex}-${p.runningScore}`}
              layout
              initial={{ opacity: 0, x: 24, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className={`min-w-[120px] shrink-0 rounded-button px-3 py-2 font-mono text-xs ${entryStyle(p.distance)}`}
            >
              <p>
                G {rankToLabel(p.guessedRank)} → A {p.actualCard.label}
              </p>
              <p className="mt-1 opacity-90">
                Δ{p.distance} · {p.pointsEarned > 0 ? '+' : ''}
                {p.pointsEarned}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
