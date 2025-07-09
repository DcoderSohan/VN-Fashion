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

      },
    },
  },
  plugins: [],
};
