import {
  decksMatch,
  reconstructDeckFromSeed,
  verifySeedMatchesCommit,
} from '@/lib/verification';
import type { Card } from '@/types/game';
import { useCallback, useState } from 'react';

export interface UseVerificationResult {
  verified: boolean | null;
  reconstructed: Card[] | null;
  check: (seed: string, commit: string, actualDeck: Card[]) => Promise<void>;
  reset: () => void;
}

export function useVerification(): UseVerificationResult {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [reconstructed, setReconstructed] = useState<Card[] | null>(null);

  const reset = useCallback(() => {
    setVerified(null);
    setReconstructed(null);
  }, []);

  const check = useCallback(
    async (seed: string, commit: string, actualDeck: Card[]) => {
      const matchCommit = await verifySeedMatchesCommit(seed, commit);
      const deck = reconstructDeckFromSeed(seed);
      const orderOk = decksMatch(deck, actualDeck);
      setReconstructed(deck);
      setVerified(matchCommit && orderOk);
    },
    [],
  );

  return { verified, reconstructed, check, reset };
}
