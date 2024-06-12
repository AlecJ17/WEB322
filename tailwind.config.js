/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.html"
  ],
  theme: {
    extend: {},
    // You can add a custom theme here if desired, like 'fantasy'
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography')
  ],
}
