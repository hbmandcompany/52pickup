import { getDistancePoints } from '@/types/game';
import type { Card, Rank } from '@/types/game';
import { useCallback } from 'react';

export interface PredictionScore {
  distance: number;
  pointsEarned: number;
}

export interface UseScoringResult {
  scorePrediction: (guess: Rank, actual: Card) => PredictionScore;
}

export function useScoring(): UseScoringResult {
  const scorePrediction = useCallback((guess: Rank, actual: Card) => {
    const distance = Math.abs(guess - actual.rank);
    return {
      distance,
      pointsEarned: getDistancePoints(distance),
    };
  }, []);

  return { scorePrediction };
}
