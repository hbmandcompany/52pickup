export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  suit: Suit;
  rank: Rank;
  label: string;
}

export type GamePhase =
  | 'landing'
  | 'lobby'
  | 'playing'
  | 'roundEnd'
  | 'verifying';

export type RoundOutcome = 'win' | 'bust' | 'complete';

export type EntryTier = 0 | 0.5 | 2 | 5 | 10 | 25;

export interface Prediction {
  cardIndex: number;
  guessedRank: Rank;
  actualCard: Card;
  distance: number;
  pointsEarned: number;
  runningScore: number;
}

export interface RoundState {
  sessionId: string;
  entryTier: EntryTier;
  commitHash: string;
  revealedSeed: string;
  deck: Card[];
  /** Index of the face-up reference card (0–51). */
  currentCardIndex: number;
  currentCard: Card | null;
  predictions: Prediction[];
  score: number;
  phase: 'awaitingPrediction' | 'revealing' | 'complete';
  remainingCounts: Record<Rank, number>;
  payoutMultiplier: number | null;
  payoutAmount: number | null;
}

export interface PlayerProfile {
  address: string;
  email: string;
  balanceUSDC: number;
  totalRoundsPlayed: number;
  totalPickUps: number;
  bestScore: number;
  averageScore: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  displayName: string | null;
  bestScore: number;
  totalPickUps: number;
  totalRounds: number;
}

export const DISTANCE_POINTS: Record<number, number> = {
  0: 5,
  1: 2,
  2: 1,
  3: 0,
  4: -1,
  5: -2,
} as const;

export function getDistancePoints(distance: number): number {
  if (distance >= 6) return -3;
  return DISTANCE_POINTS[distance] ?? -3;
}

export function calculatePayoutMultiplier(score: number): number {
  if (score <= 0) return 0;
  if (score <= 30) return score / 30;
  if (score <= 60) return 1 + (score - 30) / 30;
  if (score <= 100) return 2 + ((score - 60) * 3) / 40;
  return 5 + ((score - 100) * 7) / 155;
}

export function calculateRemainingCounts(
  dealtCards: Card[],
): Record<Rank, number> {
  const counts: Record<Rank, number> = {
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    13: 4,
  };
  for (const card of dealtCards) {
    counts[card.rank]--;
  }
  return counts;
}

export function calculateOptimalGuess(
  remainingCounts: Record<Rank, number>,
  totalRemaining: number,
): Rank {
  let bestGuess: Rank = 7;
  let bestExpectedDistance = Infinity;

  for (let g = 1; g <= 13; g++) {
    let expectedDistance = 0;
    for (let i = 1; i <= 13; i++) {
      expectedDistance +=
        (remainingCounts[i as Rank] / totalRemaining) * Math.abs(g - i);
    }
    if (expectedDistance < bestExpectedDistance) {
      bestExpectedDistance = expectedDistance;
      bestGuess = g as Rank;
    }
  }
  return bestGuess;
}
