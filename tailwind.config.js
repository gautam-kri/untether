/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink-black)',
        accent: 'var(--accent-red)',
        teal: 'var(--teal-text)',
        blend: 'var(--blend-teal)',
        line: 'var(--line-white)',
        body: 'var(--body-white)',
      },
      borderColor: {
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        base: ['var(--font-body)'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
      },
      transitionTimingFunction: {
        mech: 'var(--ease-mech)',
      },
      transitionDuration: {
        wipe: '700ms',
        ui: '200ms',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [],
};
