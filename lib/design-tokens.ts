export const colors = {
  bg: {
    primary: '#FAFAF9',
    surface: '#FFFFFF',
    sand: '#F5F0EB',
    wash: '#F0EDE8',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B6B6B',
    tertiary: '#9A9590',
    inverse: '#FAFAF9',
  },
  accent: {
    gold: '#C9A84C',
    goldHover: '#B8943F',
    goldSubtle: 'rgba(201, 168, 76, 0.08)',
    goldBorder: 'rgba(201, 168, 76, 0.25)',
  },
  status: {
    success: '#2E7D5B',
    successSubtle: 'rgba(46, 125, 91, 0.08)',
    danger: '#9B2C2C',
    dangerSubtle: 'rgba(155, 44, 44, 0.08)',
    neutral: '#6B6B6B',
  },
  border: {
    default: '#E8E4DF',
    strong: '#D1CBC4',
    focus: 'rgba(201, 168, 76, 0.4)',
  },
  card: {
    faceDown: '#1A1A1A',
    faceDownPattern: '#2A2A2A',
    faceUp: '#FFFFFF',
    suit: {
      red: '#9B2C2C',
      black: '#1A1A1A',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    display: '"Playfair Display", Georgia, "Times New Roman", serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", "Fira Code", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    extraWide: '0.12em',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.6',
    relaxed: '1.8',
  },
} as const;

export const spacing = {
  page: {
    maxWidth: '1280px',
    paddingX: 'clamp(1rem, 5vw, 4rem)',
    paddingY: '2rem',
  },
  section: {
    gap: '6rem',
    innerGap: '2rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '12px',
    gap: '1rem',
  },
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(26, 26, 26, 0.04)',
  md: '0 4px 12px rgba(26, 26, 26, 0.06)',
  lg: '0 8px 24px rgba(26, 26, 26, 0.08)',
  xl: '0 16px 48px rgba(26, 26, 26, 0.10)',
  gold: '0 4px 20px rgba(201, 168, 76, 0.15)',
  card: '0 2px 8px rgba(26, 26, 26, 0.04)',
  cardHover: '0 8px 24px rgba(26, 26, 26, 0.10)',
  cardFlip: '0 12px 32px rgba(26, 26, 26, 0.12)',
} as const;

export const motion = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    dramatic: 1.2,
  },
  easing: {
    default: [0.25, 0.1, 0.25, 1.0] as const,
    bounceOut: [0.34, 1.56, 0.64, 1.0] as const,
    dramatic: [0.16, 1, 0.3, 1] as const,
    decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  },
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
