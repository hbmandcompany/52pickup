'use client';

import type { ReactNode } from 'react';

export interface PracticePromptProps {
  visible: boolean;
  children?: ReactNode;
  className?: string;
}

export function PracticePrompt({
  visible,
  children,
  className = '',
}: PracticePromptProps): React.JSX.Element | null {
  if (!visible) return null;
  return (
    <aside
      className={`rounded-card border border-gold-border bg-gold-subtle p-6 font-body text-sm text-ink ${className}`}
    >
      <p className="font-medium">First time here?</p>
      <p className="mt-2 text-ink-secondary">
        Start with a practice round — same deck math, no funds at risk.
      </p>
      {children}
    </aside>
  );
}
