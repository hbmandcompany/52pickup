'use client';

import { motion } from 'framer-motion';
import type { Card as PlayingCard, Suit } from '@/types/game';

function suitSymbol(suit: Suit): string {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'clubs':
      return '♣';
    case 'spades':
      return '♠';
  }
}

export interface CardProps {
  card: PlayingCard | null;
  faceDown?: boolean;
  className?: string;
}

export function Card({
  card,
  faceDown = false,
  className = '',
}: CardProps): React.JSX.Element {
  const red = card
    ? card.suit === 'hearts' || card.suit === 'diamonds'
    : false;

  return (
    <div
      className={`[perspective:800px] ${className}`}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className="relative h-48 w-36 md:h-56 md:w-44"
        initial={false}
        animate={{ rotateY: faceDown ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-white shadow-card-flip"
          style={{ backfaceVisibility: 'hidden' as const }}
        >
          {card ? (
            <>
              <span
                className={`font-display text-5xl ${red ? 'text-burgundy' : 'text-ink'}`}
              >
                {card.label}
              </span>
              <span
                className={`mt-2 font-display text-3xl ${red ? 'text-burgundy' : 'text-ink'}`}
              >
                {suitSymbol(card.suit)}
              </span>
            </>
          ) : (
            <span className="font-body text-sm text-ink-tertiary">—</span>
          )}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl border border-ink/20 shadow-card-flip"
          style={{
            backfaceVisibility: 'hidden' as const,
            transform: 'rotateY(180deg)',
            backgroundColor: '#1A1A1A',
            backgroundImage:
              'repeating-linear-gradient(45deg, #2A2A2A 0, #2A2A2A 2px, #1A1A1A 2px, #1A1A1A 6px)',
          }}
        />
      </motion.div>
    </div>
  );
}
