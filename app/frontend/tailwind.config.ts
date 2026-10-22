import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssTypography from '@tailwindcss/typography';

/** Couleur sémantique pilotée par une variable CSS RGB (supporte text-ink/60, etc.). */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      // Mobile : 30 px de marge latérale (maquettes iPhone)
      padding: { DEFAULT: '1.875rem', sm: '1.875rem', lg: '2rem' },
      screens: {
        '2xl': '1300px',
      },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        // Palette de marque (captures/color.png)
        brand: {
          DEFAULT: '#0066FF',
          blue: '#0066FF',
          sky: '#00C6FF',
          cyan: '#00D4FF',
          ink: '#0A0E27',
          slate: '#334155',
          mist: '#F3F3F3',
          navy: '#3462AC',
          success: '#76DC9D',
        },
        // Couleurs sémantiques (s'inversent en dark mode)
        surface: {
          DEFAULT: token('surface'),
          raised: token('surface-raised'),
        },
        ink: token('ink'),
        body: token('body'),
        'muted-text': token('muted-text'),
        line: token('line'),
        chip: token('chip'),

        // shadcn/ui
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'brand-gradient': 'var(--gradient-brand)',
        'brand-gradient-diagonal': 'var(--gradient-brand-diagonal)',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.10)',
        card: '0 1px 1px rgb(15 23 42 / 0.03), 0 18px 40px -24px rgb(15 23 42 / 0.18)',
        glow: '0 10px 30px -10px rgb(0 102 255 / 0.45)',
        'glow-cyan': '0 14px 28px -20px rgb(0 198 255 / 0.55)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
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
  plugins: [tailwindcssAnimate, tailwindcssAspectRatio, tailwindcssTypography],
} satisfies Config;
