'use client';

import { motion } from 'framer-motion';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Container } from '@/components/shared/Container';
import { useState } from 'react';

export interface LoginSectionProps {
  className?: string;
}

export function LoginSection({
  className = '',
}: LoginSectionProps): React.JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <Container>
        <motion.div
          className="mx-auto max-w-md rounded-card border border-border bg-white p-12 shadow-surface"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <h2 className="font-display text-2xl text-ink">Start playing</h2>
          <label htmlFor="login-email" className="mt-8 block">
            <span className="sr-only">Email</span>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-button border border-border bg-cream px-4 py-3 font-body text-base text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
            />
          </label>
          <div className="mt-6">
            <ConnectWallet
              render={({ onClick, status, isLoading }) => (
                <button
                  type="button"
                  disabled={isLoading || !email.includes('@')}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.localStorage.setItem('52pickup.email', email);
                    }
                    onClick();
                  }}
                  className="w-full rounded-button border-2 border-gold px-8 py-3 font-body font-medium text-ink transition-all duration-fast hover:bg-gold-subtle hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'connecting' || isLoading ? 'Connecting…' : 'Play'}
                </button>
              )}
            />
          </div>
          <p className="mt-4 font-body text-xs text-ink-tertiary">
            A wallet is created automatically. No extensions required.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
