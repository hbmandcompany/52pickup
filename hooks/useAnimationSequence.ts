import { useCallback, useState } from 'react';

export type CascadePhase = 'idle' | 'beat1' | 'beat2' | 'beat3' | 'done';

export interface UseAnimationSequenceResult {
  phase: CascadePhase;
  startCascade: () => void;
  reset: () => void;
}

export function useAnimationSequence(): UseAnimationSequenceResult {
  const [phase, setPhase] = useState<CascadePhase>('idle');

  const startCascade = useCallback(() => {
    setPhase('beat1');
    window.setTimeout(() => setPhase('beat2'), 500);
    window.setTimeout(() => setPhase('beat3'), 1200);
    window.setTimeout(() => setPhase('done'), 2000);
  }, []);

  const reset = useCallback(() => {
    setPhase('idle');
  }, []);

  return { phase, startCascade, reset };
}

export const motionEaseDecelerate = [0, 0, 0.2, 1] as const;

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: motionEaseDecelerate },
  },
} as const;
