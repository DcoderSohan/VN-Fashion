/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['"Unbounded"', 'system-ui', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: '#f5f4f2',
          white: '#ffffff',
          black: '#0a0a0a',
          text: '#1a1a1a',
          muted: '#9ca3af',
          gold: '#b8860b',
          'gold-light': '#c9a84c',
          'gold-dark': '#8b6914',
          'gold-subtle': '#fdf8ee',
          'gold-border': '#e8d5a3',
        }
      }
    },
  },
  plugins: [],
};
