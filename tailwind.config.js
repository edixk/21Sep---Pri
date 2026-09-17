/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf3e8',
        softPink: '#f7e7e4',
        floralYellow: '#fcd35d',
        goldenYellow: '#f59e0b',
        floral: '#fbbf24',
        ink: '#1e1b4b',
        softGreen: '#84cc16',
        mutedGold: '#d4af37',
        dustyRose: '#e8daef',
        deepMauve: '#8b5cf6',
        border: '#e5e7eb',
        input: '#f3f4f6',
        ring: '#1e40af',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Roboto"', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}