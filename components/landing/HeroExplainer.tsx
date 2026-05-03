'use client';

import { motion } from 'framer-motion';
import type { Card as PlayingCard, Suit } from '@/types/game';

const DEMO_CARD: PlayingCard = {
  suit: 'spades',
  rank: 12,
  label: 'Q',
};

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

export interface HeroExplainerProps {
  className?: string;
}

export function HeroExplainer({
  className = '',
}: HeroExplainerProps): React.JSX.Element {
  const red =
    DEMO_CARD.suit === 'hearts' || DEMO_CARD.suit === 'diamonds';

  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-[clamp(1rem,5vw,4rem)] md:grid-cols-2">
        <div className="space-y-8">
          <motion.h1
            className="font-display text-4xl tracking-display text-ink md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            52 cards. 51 guesses. Pick up your winnings.
          </motion.h1>
          <motion.p
            className="font-body text-lg text-ink-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            Guess each card&apos;s value before it flips. The closer you are,
            the more you earn.
          </motion.p>
        </div>
        <motion.div
          className="flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          <div className="[perspective:800px]" style={{ willChange: 'transform' }}>
            <motion.div
              className="relative h-52 w-40 md:h-60 md:w-44"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: [0, 180, 360] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-white shadow-card-flip"
                style={{ backfaceVisibility: 'hidden' as const }}
              >
                <span
                  className={`font-display text-5xl ${red ? 'text-burgundy' : 'text-ink'}`}
                >
                  {DEMO_CARD.label}
                </span>
                <span
                  className={`mt-2 font-display text-3xl ${red ? 'text-burgundy' : 'text-ink'}`}
                >
                  {suitSymbol(DEMO_CARD.suit)}
                </span>
              </div>
              <div
                className="absolute inset-0 rounded-2xl border border-ink/20 shadow-card-flip"
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
          <span className="rounded-full border border-gold-border bg-gold-subtle px-3 py-1 font-mono text-xs uppercase tracking-label text-gold">
            Provably Fair
          </span>
        </motion.div>
      </div>
    </section>
  );
}
