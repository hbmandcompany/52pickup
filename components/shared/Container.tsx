import type { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({
  children,
  className = '',
}: ContainerProps): React.JSX.Element {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-[clamp(1rem,5vw,4rem)] ${className}`}
    >
      {children}
    </div>
  );
}
