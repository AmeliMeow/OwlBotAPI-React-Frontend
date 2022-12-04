/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ringColor: theme => (theme('theme.extend.colors')),
    extend: {
      animation: {
        'card-expand': 'expand 0.5s ease-out'
      },
      keyframes: {
        expand:{
          '0%' : { 'max-height': '0%' },
          '100%' : { 'max-height': '100%' }
        }
      }

    },
  },
  plugins: [
    require('tailwind-dracula')(),
  ],
}
