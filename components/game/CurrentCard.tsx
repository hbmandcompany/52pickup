'use client';

import { CardReveal } from '@/components/game/CardReveal';
import type { Card } from '@/types/game';

export interface CurrentCardProps {
  card: Card | null;
  isFlipping: boolean;
  className?: string;
}

export function CurrentCard({
  card,
  isFlipping,
  className = '',
}: CurrentCardProps): React.JSX.Element {
  return (
    <CardReveal card={card} faceDown={isFlipping} className={className} />
  );
}
