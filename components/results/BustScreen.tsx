'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface BustScreenProps {
  active: boolean;
  className?: string;
}

export function BustScreen({
  active,
  className = '',
}: BustScreenProps): React.JSX.Element | null {
  const [desat, setDesat] = useState(false);

  useEffect(() => {
    if (!active) {
      setDesat(false);
      return;
    }
    setDesat(true);
    const t = window.setTimeout(() => setDesat(false), 1000);
    return () => window.clearTimeout(t);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`pointer-events-none fixed inset-0 z-30 flex items-center justify-center bg-cream/40 px-6 ${className}`}
      style={{ filter: desat ? 'saturate(0.85)' : 'none' }}
    >
      <div className="max-w-md rounded-card border border-border bg-white p-10 text-center shadow-lg">
        <p className="font-mono text-4xl text-burgundy">Bust</p>
        <p className="mt-4 font-body text-lg text-ink-secondary">
          No payout this round
        </p>
      </div>
    </motion.div>
  );
}
