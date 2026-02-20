/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#1B6CA8',
        accent: '#F4A261',
        leaf: '#2D9A4B',
        cream: '#FFF8F0',
        deep: '#0D2137',
      },
    },
  },
  plugins: [],
}
