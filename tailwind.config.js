/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

