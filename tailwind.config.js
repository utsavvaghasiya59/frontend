/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red': '#ff0000',
        'red-700': 'rgb(127 29 29)',
        'semi-black-light': '#222222',
        'semi-black-dark': '#191919',
        'red-100': 'rgb(254 226 226)'
      },
    },
  },
  plugins: [],
}
