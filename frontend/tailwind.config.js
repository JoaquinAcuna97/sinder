/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // This is crucial for automatic dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}