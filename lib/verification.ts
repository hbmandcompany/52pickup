import { createOrderedDeck, shuffleDeckWithSeed } from '@/lib/deck';
import type { Card } from '@/types/game';

export async function sha256Hex(message: string): Promise<string> {
  const bytes = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const arr = new Uint8Array(digest);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifySeedMatchesCommit(
  seed: string,
  commitHash: string,
): Promise<boolean> {
  const hash = await sha256Hex(seed);
  return hash === commitHash;
}

export function reconstructDeckFromSeed(seed: string): Card[] {
  return shuffleDeckWithSeed(createOrderedDeck(), seed);
}

export function decksMatch(a: Card[], b: Card[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i]?.suit !== b[i]?.suit || a[i]?.rank !== b[i]?.rank) {
      return false;
    }
  }
  return true;
}
