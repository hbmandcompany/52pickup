'use client';

import { Footer } from '@/components/landing/Footer';
import { HeroExplainer } from '@/components/landing/HeroExplainer';
import { HowToPlay } from '@/components/landing/HowToPlay';
import { LoginSection } from '@/components/landing/LoginSection';
import { BalanceDisplay } from '@/components/lobby/BalanceDisplay';
import { EntryTierSelector } from '@/components/lobby/EntryTierSelector';
import { PracticePrompt } from '@/components/lobby/PracticePrompt';
import { GameBoard } from '@/components/game/GameBoard';
import { BustScreen } from '@/components/results/BustScreen';
import { PickUpCascade } from '@/components/results/PickUpCascade';
import { PlayAgain } from '@/components/results/PlayAgain';
import { RoundSummary } from '@/components/results/RoundSummary';
import { ScoreBreakdown } from '@/components/results/ScoreBreakdown';
import { VerifyFairness } from '@/components/results/VerifyFairness';
import { Container } from '@/components/shared/Container';
import { NavBar } from '@/components/shared/NavBar';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { useGameState } from '@/hooks/useGameState';
import { useWallet } from '@/hooks/useWallet';
import type { EntryTier } from '@/types/game';
import { useEffect, useRef, useState } from 'react';

export function MainView(): React.JSX.Element {
  const { isConnected } = useWallet();
  const {
    phase,
    round,
    selectedRank,
    setSelectedRank,
    setPhase,
    beginRound,
    confirmPrediction,
    returnToLobby,
  } = useGameState();
  const [tier, setTier] = useState<EntryTier>(0);
  const [scoreTick, setScoreTick] = useState(0);
  const [showPractice, setShowPractice] = useState(true);
  const prevPredLen = useRef(0);

  useEffect(() => {
    if (isConnected && phase === 'landing') {
      setPhase('lobby');
    }
  }, [isConnected, phase, setPhase]);

  useEffect(() => {
    const len = round?.predictions.length ?? 0;
    if (len > prevPredLen.current) {
      setScoreTick((n) => n + 1);
    }
    prevPredLen.current = len;
  }, [round?.predictions.length]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-cream">
        <HeroExplainer />
        <HowToPlay />
        <LoginSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <NavBar trailing={<WalletConnect />} />
      {phase === 'lobby' ? (
        <main className="py-24 pt-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
              <div className="space-y-8">
                <BalanceDisplay />
                <PracticePrompt visible={showPractice}>
                  <button
                    type="button"
                    onClick={() => {
                      setTier(0);
                      setShowPractice(false);
                    }}
                    className="mt-4 font-body text-sm text-gold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
                  >
                    Use practice tier
                  </button>
                </PracticePrompt>
              </div>
              <div className="space-y-10">
                <EntryTierSelector selected={tier} onSelect={setTier} />
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      void beginRound(tier);
                    }}
                    className="rounded-button border-2 border-gold px-10 py-3 font-body font-medium text-ink transition-all duration-fast hover:bg-gold-subtle hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-border"
                  >
                    Deal cards
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </main>
      ) : null}

      {phase === 'playing' && round ? (
        <GameBoard
          round={round}
          selectedRank={selectedRank}
          onSelectRank={setSelectedRank}
          onConfirm={confirmPrediction}
          scoreTick={scoreTick}
        />
      ) : null}

      {phase === 'roundEnd' && round ? (
        <>
          <BustScreen active={round.score <= 0} />
          <main className="px-[clamp(1rem,5vw,4rem)] py-24 pt-32">
            <div className="mx-auto flex max-w-xl flex-col gap-10">
              <PickUpCascade
                play
                score={round.score}
                payoutAmount={round.payoutAmount}
              />
              <RoundSummary round={round} />
              <ScoreBreakdown predictions={round.predictions} />
              <VerifyFairness
                commitHash={round.commitHash}
                seed={round.revealedSeed}
                deck={round.deck}
              />
              <PlayAgain onDealAgain={returnToLobby} />
            </div>
          </main>
        </>
      ) : null}

      {phase === 'verifying' ? (
        <main className="py-24 pt-32">
          <Container>
            <p className="font-body text-ink-secondary">
              Verification view is available from the round summary.
            </p>
          </Container>
        </main>
      ) : null}
    </div>
  );
}
