import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps): React.JSX.Element {
  const base =
    'inline-flex items-center justify-center rounded-button font-body font-medium transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border disabled:cursor-not-allowed disabled:opacity-50';

  const styles =
    variant === 'primary'
      ? 'border-2 border-gold px-8 py-3 text-ink hover:bg-gold-subtle hover:shadow-gold'
      : 'border border-border px-6 py-2.5 text-ink-secondary hover:border-strong hover:text-ink';

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
