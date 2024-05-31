import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      width: {
        37: '148px',
      },
      height: {
        37: '148px',
      },
      maxWidth: {
        37: '148px',
        'main-content': '864px',
      },
      maxHeight: {
        37: '148px',
      },
      gridTemplateColumns: {
        posts: 'repeat(2, minmax(26rem, 1fr))',
      },
      backgroundImage: {
        logo: 'url("/logo.webp")',
      },
      colors: {
        title: 'var(--title)',
        subtitle: 'var(--subtitle)',
        label: 'var(--label)',

        profile: 'var(--profile)',
        blue: 'var(--blue)',

        border: {
          DEFAULT: 'var(--border)',
        },
        input: {
          DEFAULT: 'var(--input)',
        },
        background: {
          DEFAULT: 'var(--background)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
        },
        card: {
          DEFAULT: 'var(--card)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
