/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grayy": "#1f2328",
        "dark-grayy": "#111315"
      },
      screens: {
        "xs": "480px"
      }
    },
  },
  plugins: [],
}

