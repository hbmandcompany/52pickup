'use client';

import { Card } from '@/components/shared/Card';
import type { Card as PlayingCard } from '@/types/game';

export interface CardRevealProps {
  card: PlayingCard | null;
  faceDown: boolean;
  className?: string;
}

export function CardReveal({
  card,
  faceDown,
  className = '',
}: CardRevealProps): React.JSX.Element {
  return (
    <div className={`flex justify-center ${className}`}>
      <Card card={card} faceDown={faceDown} />
    </div>
  );
}
