import Link from 'next/link';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps): React.JSX.Element {
  return (
    <footer className={`border-t border-border bg-wash py-16 ${className}`}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-[clamp(1rem,5vw,4rem)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-body text-sm text-ink-secondary">
            52 PickUp is a product of{' '}
            <Link
              href="https://hbmandcompany.com"
              className="text-ink underline underline-offset-4 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border rounded-sm"
            >
              HBM & Company
            </Link>
          </p>
          <p className="mt-2 font-body text-xs text-ink-tertiary">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-body text-xs uppercase tracking-label text-ink-tertiary">
          <Link
            href="https://www.52pickup.cc"
            className="hover:text-ink focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border rounded-sm"
          >
            Terms
          </Link>
          <Link
            href="https://www.52pickup.cc"
            className="hover:text-ink focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border rounded-sm"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
