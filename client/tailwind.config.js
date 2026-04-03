/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aged-paper': '#F4E8D0',
        'dark-brass': '#8B7355',
        'darker-brass': '#6B5638',
        'oxidized-copper': '#4A7C6F',
        'dark-leather': '#3E2723',
        'burgundy': '#6B2737',
      },
      fontFamily: {
        'vintage': ['"IM Fell English"', 'serif'],
      },
    },
  },
  plugins: [],
}
