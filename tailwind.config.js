/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Vazir': ["Vazir"],
        'VazirMedium': ["VazirMedium"],
        'VazirBold': ["VazirBold"],
        'Ojan': ["Ojan"],
        'VazirFd' : ["VazirFd"]
      },
    },
  },
  plugins: [require('tailwind-children'),],
}

