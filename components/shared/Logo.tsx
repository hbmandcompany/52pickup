import Link from 'next/link';

export interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps): React.JSX.Element {
  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border focus-visible:rounded-button ${className}`}
    >
      <span className="font-display text-3xl font-bold tracking-display text-ink md:text-4xl">
        52
      </span>
      <span className="font-body text-xs font-medium tracking-logo text-ink-secondary">
        PICKUP
      </span>
    </Link>
  );
}
