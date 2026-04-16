
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['Oswald', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'night-black': '#050505',
        'night-surface': '#121212',
        'neon-amber': '#fbbf24',
        'neon-red': '#ef4444',
        'ice-white': '#f8fafc',
      },
      boxShadow: {
        'neon-amber': '0 0 15px -3px rgba(251, 191, 36, 0.4)',
        'neon-red': '0 0 15px -3px rgba(239, 68, 68, 0.4)',
      }
    },
  },
  plugins: [],
}
