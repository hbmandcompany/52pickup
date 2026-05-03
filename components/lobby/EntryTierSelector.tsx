'use client';

import { ENTRY_TIERS, TIER_LABELS } from '@/lib/wallet-config';
import type { EntryTier } from '@/types/game';
import { motion } from 'framer-motion';

export interface EntryTierSelectorProps {
  selected: EntryTier;
  onSelect: (tier: EntryTier) => void;
  className?: string;
}

export function EntryTierSelector({
  selected,
  onSelect,
  className = '',
}: EntryTierSelectorProps): React.JSX.Element {
  return (
    <div className={`space-y-8 ${className}`}>
      <h2 className="font-display text-2xl text-ink">Choose your stake</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ENTRY_TIERS.map((tier, index) => {
          const isSelected = tier === selected;
          return (
            <motion.button
              key={String(tier)}
              type="button"
              onClick={() => onSelect(tier)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`rounded-card border p-6 text-left shadow-card transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border ${
                isSelected
                  ? 'border-gold bg-gold-subtle shadow-card-hover'
                  : 'border-border bg-white hover:border-strong hover:shadow-card-hover'
              }`}
            >
              <p className="font-mono text-lg text-ink">{TIER_LABELS[tier]}</p>
              <p className="mt-2 font-body text-sm text-ink-secondary">
                {tier === 0 ? 'No stake — learn the flow.' : 'Real stake round.'}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
