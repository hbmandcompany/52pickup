'use client';

import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { formatUsd } from '@/lib/format';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export interface PickUpCascadeProps {
  score: number;
  payoutAmount: number | null;
  play: boolean;
  className?: string;
}

export function PickUpCascade({
  score,
  payoutAmount,
  play,
  className = '',
}: PickUpCascadeProps): React.JSX.Element | null {
  const { phase, startCascade, reset } = useAnimationSequence();

  useEffect(() => {
    if (play && payoutAmount !== null && payoutAmount > 0) {
      startCascade();
    } else {
      reset();
    }
  }, [play, payoutAmount, reset, startCascade]);

  if (!play || !payoutAmount || payoutAmount <= 0) return null;

  const scale =
    phase === 'beat1' || phase === 'beat2' || phase === 'beat3' || phase === 'done'
      ? 1.3
      : 1;

  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-4xl text-emerald-deep">{score}</p>
        <motion.p
          className="mt-4 font-mono text-2xl text-gold"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: phase === 'idle' || phase === 'beat1' ? 0 : 1,
            y: phase === 'idle' || phase === 'beat1' ? 12 : 0,
          }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          {formatUsd(payoutAmount)}
        </motion.p>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-8 opacity-30"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={
            phase === 'beat3' || phase === 'done'
              ? { backgroundPosition: ['-200% 0', '200% 0'] }
              : {}
          }
          transition={{ duration: 2, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
