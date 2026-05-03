import { createOrderedDeck, shuffleDeckWithSeed } from '@/lib/deck';
import type { Card } from '@/types/game';
import { useCallback, useMemo } from 'react';

export interface UseDeckResult {
  createShuffledDeck: (seed: string) => Card[];
}

export function useDeck(): UseDeckResult {
  const createShuffledDeck = useCallback((seed: string) => {
    return shuffleDeckWithSeed(createOrderedDeck(), seed);
  }, []);

  return useMemo(() => ({ createShuffledDeck }), [createShuffledDeck]);
}
