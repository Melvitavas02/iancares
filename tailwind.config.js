/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFC72C",
          blue: "#005A9C"
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    }
  },
  plugins: []
}
