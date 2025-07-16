/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Audiowide: ["Audiowide", "sans-serif"],
        Orbitron: ["Orbitron", "sans-serif"],
        Courgette: ["Courgette", "sans-serif"],
        Unbounded: ["Unbounded", "sans-serif"],
        Tourney: ["Tourney", "sans-serif"],
        writingMode: { "vertical-rl": "vertical-rl" },
        animation: { fade: "fadeIn 0.5s ease-in-out" },
        keyframes: {
          fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        },
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".writing-vertical-rl": {
          "writing-mode": "vertical-rl",
          "text-orientation": "mixed",
        },
      });
    },
  ],
};
