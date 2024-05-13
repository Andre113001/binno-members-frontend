/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      primary: "#FF7A00",
      secondary: '#5c9fef',
      whiteBG: "#F4F4F4"
    },
  },
  plugins: [],
}

