'use client';

import { Button } from '@/components/shared/Button';

export interface PlayAgainProps {
  onDealAgain: () => void;
  className?: string;
}

export function PlayAgain({
  onDealAgain,
  className = '',
}: PlayAgainProps): React.JSX.Element {
  return (
    <div className={`flex justify-center ${className}`}>
      <Button type="button" variant="primary" onClick={onDealAgain}>
        Deal again
      </Button>
    </div>
  );
}
