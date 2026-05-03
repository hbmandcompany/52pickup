'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface ToastProps {
  message: string | null;
  children?: ReactNode;
}

export function Toast({ message, children }: ToastProps): React.JSX.Element {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-50 w-[min(90vw,360px)] -translate-x-1/2 rounded-card border border-border bg-white px-4 py-3 font-body text-sm text-ink shadow-surface"
        >
          {message}
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
