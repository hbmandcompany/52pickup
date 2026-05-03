'use client';

export interface DeckProgressProps {
  currentIndex: number;
  className?: string;
}

export function DeckProgress({
  currentIndex,
  className = '',
}: DeckProgressProps): React.JSX.Element {
  const n = currentIndex + 1;
  const pct = Math.min(100, (n / 52) * 100);
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="font-mono text-sm text-ink-tertiary">
        Card {n} of 52
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-gold/40 transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
