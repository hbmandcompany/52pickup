'use client';

import { rankToLabel } from '@/lib/deck';
import type { Rank } from '@/types/game';

export interface PredictionInputProps {
  selected: Rank | null;
  onSelect: (r: Rank) => void;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

const RANKS: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function PredictionInput({
  selected,
  onSelect,
  onConfirm,
  disabled = false,
  className = '',
}: PredictionInputProps): React.JSX.Element {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-wrap justify-center gap-2">
        {RANKS.map((r) => {
          const isOn = selected === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onSelect(r)}
              disabled={disabled}
              className={`flex h-12 w-10 items-center justify-center rounded-button border font-mono text-sm transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border ${
                isOn
                  ? 'border-gold bg-gold-subtle text-ink ring-2 ring-gold-border'
                  : 'border-border bg-white text-ink hover:border-gold hover:bg-gold-subtle'
              } disabled:opacity-50`}
            >
              {rankToLabel(r)}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onConfirm}
          disabled={disabled || selected === null}
          className="rounded-button border-2 border-gold px-12 py-3 font-body font-medium text-ink transition-all duration-fast hover:bg-gold-subtle hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
