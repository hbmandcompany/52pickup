import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF9',
        sand: '#F5F0EB',
        wash: '#F0EDE8',
        gold: {
          DEFAULT: '#C9A84C',
          hover: '#B8943F',
          subtle: 'rgba(201, 168, 76, 0.08)',
          border: 'rgba(201, 168, 76, 0.25)',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          secondary: '#6B6B6B',
          tertiary: '#9A9590',
        },
        emerald: {
          deep: '#2E7D5B',
          subtle: 'rgba(46, 125, 91, 0.08)',
        },
        burgundy: {
          DEFAULT: '#9B2C2C',
          subtle: 'rgba(155, 44, 44, 0.08)',
        },
        border: {
          DEFAULT: '#E8E4DF',
          strong: '#D1CBC4',
        },
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        body: [
          'var(--font-body)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'SF Mono',
          'Fira Code',
          'monospace',
        ],
      },
      letterSpacing: {
        display: '-0.02em',
        label: '0.05em',
        logo: '0.12em',
      },
      boxShadow: {
        card: '0 2px 8px rgba(26, 26, 26, 0.04)',
        'card-hover': '0 8px 24px rgba(26, 26, 26, 0.10)',
        'card-flip': '0 12px 32px rgba(26, 26, 26, 0.12)',
        gold: '0 4px 20px rgba(201, 168, 76, 0.15)',
        surface: '0 4px 12px rgba(26, 26, 26, 0.06)',
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
      transitionDuration: {
        fast: '150ms',
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
        cascade: 'cascade 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'score-tick': 'scoreTick 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0, 0, 0.2, 1)',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        cascade: {
          '0%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(-40px) scale(1.1)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateY(-120px) scale(0.3)',
            opacity: '0',
          },
        },
        scoreTick: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(201, 168, 76, 0)',
          },
          '50%': {
            boxShadow: '0 0 0 8px rgba(201, 168, 76, 0.12)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
