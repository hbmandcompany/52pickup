'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '1',
    title: 'The Flip',
    body: 'A card is revealed from a shuffled deck. 51 remain.',
  },
  {
    n: '2',
    title: 'The Guess',
    body: "Predict the next card's value. Use the odds. Track the deck.",
  },
  {
    n: '3',
    title: 'The PickUp',
    body: 'Closer guesses earn more. Perfect calls pay the most. Collect your winnings.',
  },
] as const;

export interface HowToPlayProps {
  className?: string;
}

export function HowToPlay({ className = '' }: HowToPlayProps): React.JSX.Element {
  return (
    <section className={`bg-sand py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-[clamp(1rem,5vw,4rem)]">
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.n}
              className="rounded-card border border-border bg-white p-8 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <p className="font-display text-3xl text-gold">{step.n}</p>
              <h2 className="mt-4 font-display text-xl text-ink">{step.title}</h2>
              <p className="mt-4 font-body text-base text-ink-secondary">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
