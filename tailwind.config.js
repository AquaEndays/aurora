/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          blue: '#0077b6',
          cyan: '#00b4d8',
          dark: '#03045e',
        }
      }
    },
  },
  plugins: [],
}