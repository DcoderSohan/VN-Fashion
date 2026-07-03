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
        }
      }
    },
  },
  plugins: [],
};
