/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#0a0a0f',
          surface: '#111118',
          raised:  '#18181f',
          overlay: '#1e1e28',
          hover:   '#24242f',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          base:   'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.18)',
        },
        text: {
          primary:   '#f2f2f8',
          secondary: '#9898b0',
          tertiary:  '#55556a',
          inverse:   '#0a0a0f',
        },
        accent: {
          blue:   '#4f8dff',
          violet: '#8b5cf6',
          rose:   '#f43f5e',
          amber:  '#f59e0b',
          emerald:'#10b981',
          cyan:   '#06b6d4',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero':  ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1':    ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2':    ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h3':    ['1.25rem', { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4':    ['1.1rem',  { lineHeight: '1.4',  fontWeight: '600' }],
        'body':  ['1rem',    { lineHeight: '1.65' }],
        'sm':    ['0.875rem',{ lineHeight: '1.6'  }],
        'xs':    ['0.75rem', { lineHeight: '1.5'  }],
        'xxs':   ['0.65rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      borderRadius: {
        'card': '16px',
        'pill': '999px',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12)',
        'glow-blue':  '0 0 24px rgba(79,141,255,0.25)',
        'glow-rose':  '0 0 24px rgba(244,63,94,0.25)',
        'glow-violet':'0 0 24px rgba(139,92,246,0.25)',
        'modal':      '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'fade-in':      'fadeIn 0.35s ease-out both',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right':'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-dot':    'pulseDot 2s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'toast-in':     'toastIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'badge-pop':    'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.85)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.95)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        badgePop: {
          from: { opacity: '0', transform: 'scale(0.6)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
