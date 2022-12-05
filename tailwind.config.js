/** @type {import('tailwindcss').Config} */
const dracula = require('tailwind-dracula/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'expand': 'expand 0.5s ease-out'
      },
      keyframes: {
        expand:{
          '0%' : { 
            'height': '0%'
          },
          '100%' : { 
            'height': '80%'
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-dracula')(),
  ],
}
