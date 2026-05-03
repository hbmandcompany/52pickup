import type { EntryTier } from '@/types/game';
import { base } from 'wagmi/chains';

export const SUPPORTED_CHAIN = base;

export const USDC_CONTRACT_ADDRESS =
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;

export const GAME_VAULT_ADDRESS =
  '0x0000000000000000000000000000000000000000' as const;

export const FAIRNESS_REGISTRY_ADDRESS =
  '0x0000000000000000000000000000000000000000' as const;

export const WALLET_CONFIG = {
  appName: '52 PickUp',
  appIcon: '/favicon.ico',
  appDescription: 'A provably fair card guessing game',
  chain: SUPPORTED_CHAIN,
} as const;

export const ENTRY_TIERS: readonly EntryTier[] = [
  0, 0.5, 2, 5, 10, 25,
] as const;

export const TIER_LABELS: Record<EntryTier, string> = {
  0: 'Practice',
  0.5: '$0.50',
  2: '$2',
  5: '$5',
  10: '$10',
  25: '$25',
} as const;

export const BASE_USDC_TOKEN = {
  address: USDC_CONTRACT_ADDRESS,
  chainId: SUPPORTED_CHAIN.id,
  decimals: 6,
  image: null,
  name: 'USD Coin',
  symbol: 'USDC',
} as const;
