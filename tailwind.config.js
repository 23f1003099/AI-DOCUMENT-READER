/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0b0b',       // Deep black
        foreground: '#ffffff',       // White text
        card: '#121212',             // Slightly lighter black
        border: '#222222',           // For outlines
        glow: '#ffffff',             // For glowing buttons/effects
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 255, 255, 0.1)',  // soft white glow
      },
    },
  },
  plugins: [],
};
