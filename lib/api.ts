import type { Card, EntryTier, Prediction, Rank } from '@/types/game';
import { API_BASE } from '@/lib/constants';

export interface StartRoundResponse {
  sessionId: string;
  commitHash: string;
}

export async function startRoundRequest(
  tier: EntryTier,
): Promise<StartRoundResponse> {
  void API_BASE;
  return {
    sessionId: `local-${Date.now()}-${tier}`,
    commitHash: '',
  };
}

export async function submitPredictionRequest(
  sessionId: string,
  cardIndex: number,
  guessedRank: Rank,
): Promise<{ actualCard: Card; points: number }> {
  void sessionId;
  void cardIndex;
  void guessedRank;
  return {
    actualCard: {
      suit: 'spades',
      rank: 1,
      label: 'A',
    },
    points: 0,
  };
}

export async function endRoundRequest(
  sessionId: string,
  predictions: Prediction[],
): Promise<{ payoutMultiplier: number; payoutUsd: number }> {
  void sessionId;
  return {
    payoutMultiplier: predictions.length > 0 ? 1 : 0,
    payoutUsd: 0,
  };
}
