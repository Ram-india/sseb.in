/**
 * CommonJS on purpose. With "type": "module" in package.json an ESM
 * tailwind.config.js is cached by Node for the life of the process, so editing
 * theme tokens left a running dev server compiling against a stale config —
 * new utilities failed with "class does not exist" until the process was
 * killed. A .cjs config is loaded through require and is re-read on change.
 */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: token('--c-page'), // page background
        surface: token('--c-surface'), // cards, header
        subtle: token('--c-subtle'), // tinted section bands
        line: token('--c-line'), // borders and rules
        ink: token('--c-ink'), // headings, high-contrast text
        body: token('--c-body'), // paragraph text
        muted: token('--c-muted'), // secondary text
        accent: token('--c-accent'), // primary action colour
        'accent-soft': token('--c-accent-soft'),
        secondary: token('--c-secondary'), // supporting emphasis
        'secondary-soft': token('--c-secondary-soft'),
        highlight: token('--c-highlight'), // credentials only, used sparingly
        elevated: token('--c-elevated'),
        deep: token('--c-deep'), // always-dark bands (hero, CTA, footer)
        'deep-ink': token('--c-deep-ink'), // text on `deep`
      },
      fontFamily: {
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        // Single-sourced from --font-heading in index.css so the stack is
        // declared once for both `font-heading` and the base heading rules.
        heading: 'var(--font-heading)',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-shadow) / 0.06), 0 12px 32px -16px rgb(var(--c-shadow) / 0.16)',
        cardHover:
          '0 2px 6px rgb(var(--c-shadow) / 0.08), 0 28px 56px -22px rgb(var(--c-shadow) / 0.30)',
        panel: '0 24px 64px -24px rgb(var(--c-shadow) / 0.32)',
      },
      keyframes: {
        heroZoom: { from: { transform: 'scale(1.001)' }, to: { transform: 'scale(1.09)' } },
        heroRise: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        heroProgress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        heroZoom: 'heroZoom 9s ease-out forwards',
        heroRise: 'heroRise 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        heroProgress: 'heroProgress linear forwards',
      },
    },
  },
  plugins: [],
}
