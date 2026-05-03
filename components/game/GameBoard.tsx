'use client';

import { CurrentCard } from '@/components/game/CurrentCard';
import { DeckProgress } from '@/components/game/DeckProgress';
import { PredictionHistory } from '@/components/game/PredictionHistory';
import { PredictionInput } from '@/components/game/PredictionInput';
import { RemainingDeck } from '@/components/game/RemainingDeck';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { ROUND_ANIMATION_MS } from '@/lib/constants';
import type { Rank, RoundState } from '@/types/game';
import { useCallback, useEffect, useState } from 'react';

export interface GameBoardProps {
  round: RoundState;
  selectedRank: Rank | null;
  onSelectRank: (r: Rank | null) => void;
  onConfirm: () => void;
  scoreTick: number;
  className?: string;
}

export function GameBoard({
  round,
  selectedRank,
  onSelectRank,
  onConfirm,
  scoreTick,
  className = '',
}: GameBoardProps): React.JSX.Element {
  const [flipping, setFlipping] = useState(false);

  const handleConfirm = useCallback(() => {
    if (selectedRank === null || round.phase !== 'awaitingPrediction') return;
    setFlipping(true);
    window.setTimeout(() => {
      onConfirm();
      window.setTimeout(() => {
        setFlipping(false);
      }, 50);
    }, ROUND_ANIMATION_MS.cardFlip);
  }, [onConfirm, round.phase, selectedRank]);

  useEffect(() => {
    setFlipping(false);
  }, [round.currentCardIndex]);

  return (
    <div className={`space-y-12 pb-24 pt-28 ${className}`}>
      <ScoreDisplay
        score={round.score}
        currentCardIndex={round.currentCardIndex}
        tickKey={scoreTick}
      />
      <div className="mx-auto max-w-xl space-y-10 px-[clamp(1rem,5vw,4rem)]">
        <CurrentCard card={round.currentCard} isFlipping={flipping} />
        <DeckProgress currentIndex={round.currentCardIndex} />
        <PredictionInput
          selected={selectedRank}
          onSelect={(r) => onSelectRank(r)}
          onConfirm={handleConfirm}
          disabled={round.phase !== 'awaitingPrediction' || flipping}
        />
        <RemainingDeck deck={round.deck} lastRevealedIndex={round.currentCardIndex} />
        <PredictionHistory predictions={round.predictions} />
      </div>
    </div>
  );
}
