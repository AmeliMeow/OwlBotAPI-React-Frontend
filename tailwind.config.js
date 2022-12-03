/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ringColor: theme => (theme('theme.extend.colors')),
    extend: {},
  },
  plugins: [
    require('tailwind-dracula')(),
  ],
}
