'use client';

import { Logo } from '@/components/shared/Logo';
import { useWallet } from '@/hooks/useWallet';
import type { ReactNode } from 'react';

export interface NavBarProps {
  trailing?: ReactNode;
}

export function NavBar({ trailing }: NavBarProps): React.JSX.Element {
  const { balanceUsdDisplay } = useWallet();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border bg-cream/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(1rem,5vw,4rem)] py-4">
        <Logo />
        <div className="flex items-center gap-4">
          {trailing}
          <span className="font-mono text-sm text-ink-secondary">
            {balanceUsdDisplay}
          </span>
        </div>
      </nav>
    </header>
  );
}
