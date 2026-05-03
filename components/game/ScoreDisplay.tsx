'use client';

import { calculatePayoutMultiplier } from '@/types/game';
import { motion } from 'framer-motion';

export interface ScoreDisplayProps {
  score: number;
  currentCardIndex: number;
  tickKey: number;
  className?: string;
}

export function ScoreDisplay({
  score,
  currentCardIndex,
  tickKey,
  className = '',
}: ScoreDisplayProps): React.JSX.Element {
  const mult = calculatePayoutMultiplier(score);
  const multClass = mult < 1 ? 'text-burgundy' : 'text-gold';
  const scoreClass =
    score > 30
      ? 'text-emerald-deep'
      : score < 0
        ? 'text-burgundy'
        : 'text-ink';

  return (
    <div
      className={`border-b border-border bg-white/80 px-[clamp(1rem,5vw,4rem)] py-6 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.p
            key={tickKey}
            className={`font-mono text-3xl ${scoreClass} transition-colors duration-300`}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {score}
          </motion.p>
          <p className="mt-1 font-body text-xs uppercase tracking-label text-ink-tertiary">
            Running score
          </p>
        </div>
        <div>
          <p className={`font-mono text-lg ${multClass}`}>
            {mult.toFixed(2)}×
          </p>
          <p className="mt-1 font-body text-xs uppercase tracking-label text-ink-tertiary">
            Payout multiple
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-mono text-sm text-ink-tertiary">
            Card {currentCardIndex + 1} of 52
          </p>
        </div>
      </div>
    </div>
  );
}
