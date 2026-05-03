export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.52pickup.cc';

export const ROUND_ANIMATION_MS = {
  cardFlip: 600,
  scoreTick: 300,
  cascadeTotal: 2000,
} as const;
