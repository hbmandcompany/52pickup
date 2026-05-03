import { sha256Hex } from '@/lib/verification';
import { shuffleDeckWithSeed } from '@/lib/deck';
import { createOrderedDeck } from '@/lib/deck';
import {
  calculatePayoutMultiplier,
  calculateRemainingCounts,
  getDistancePoints,
} from '@/types/game';
import type { Card, EntryTier, GamePhase, Rank, RoundState } from '@/types/game';
import { useCallback, useState } from 'react';

function randomSeed(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${crypto.randomUUID()}-${Date.now()}`;
  }
  return `${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

async function buildRoundState(entryTier: EntryTier): Promise<RoundState> {
  const seed = randomSeed();
  const commitHash = await sha256Hex(seed);
  const deck = shuffleDeckWithSeed(createOrderedDeck(), seed);
  const first = deck[0];
  if (!first) {
    throw new Error('Deck generation failed');
  }
  const dealt: Card[] = [first];
  return {
    sessionId: `session-${Date.now()}`,
    entryTier,
    commitHash,
    revealedSeed: seed,
    deck,
    currentCardIndex: 0,
    currentCard: first,
    predictions: [],
    score: 0,
    phase: 'awaitingPrediction',
    remainingCounts: calculateRemainingCounts(dealt),
    payoutMultiplier: null,
    payoutAmount: null,
  };
}

export interface UseGameStateResult {
  phase: GamePhase;
  round: RoundState | null;
  selectedRank: Rank | null;
  setSelectedRank: (r: Rank | null) => void;
  setPhase: (p: GamePhase) => void;
  beginRound: (tier: EntryTier) => Promise<void>;
  confirmPrediction: () => void;
  returnToLobby: () => void;
}

export function useGameState(): UseGameStateResult {
  const [phase, setPhase] = useState<GamePhase>('landing');
  const [round, setRound] = useState<RoundState | null>(null);
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);

  const beginRound = useCallback(async (tier: EntryTier) => {
    const next = await buildRoundState(tier);
    setRound(next);
    setSelectedRank(null);
    setPhase('playing');
  }, []);

  const confirmPrediction = useCallback(() => {
    if (selectedRank === null) return;

    let finishedRound = false;

    setRound((prev) => {
      if (!prev || prev.phase !== 'awaitingPrediction') {
        return prev;
      }
      const nextIndex = prev.currentCardIndex + 1;
      const actual = prev.deck[nextIndex];
      if (!actual) return prev;

      const distance = Math.abs(selectedRank - actual.rank);
      const pointsEarned = getDistancePoints(distance);
      const newScore = prev.score + pointsEarned;
      const prediction = {
        cardIndex: nextIndex,
        guessedRank: selectedRank,
        actualCard: actual,
        distance,
        pointsEarned,
        runningScore: newScore,
      };

      const dealt = prev.deck.slice(0, nextIndex + 1);
      const remainingCounts = calculateRemainingCounts(dealt);
      const done = nextIndex >= 51;

      if (done) {
        finishedRound = true;
        const mult = calculatePayoutMultiplier(newScore);
        const stake = prev.entryTier;
        const payoutAmount = stake > 0 ? stake * mult : 0;
        return {
          ...prev,
          predictions: [...prev.predictions, prediction],
          score: newScore,
          currentCardIndex: nextIndex,
          currentCard: actual,
          phase: 'complete',
          remainingCounts,
          payoutMultiplier: mult,
          payoutAmount,
        };
      }

      return {
        ...prev,
        predictions: [...prev.predictions, prediction],
        score: newScore,
        currentCardIndex: nextIndex,
        currentCard: actual,
        phase: 'awaitingPrediction',
        remainingCounts,
      };
    });

    setSelectedRank(null);

    if (finishedRound) {
      queueMicrotask(() => setPhase('roundEnd'));
    }
  }, [selectedRank]);

  const returnToLobby = useCallback(() => {
    setRound(null);
    setSelectedRank(null);
    setPhase('lobby');
  }, []);

  return {
    phase,
    round,
    selectedRank,
    setSelectedRank,
    setPhase,
    beginRound,
    confirmPrediction,
    returnToLobby,
  };
}
