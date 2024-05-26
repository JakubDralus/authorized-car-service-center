/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
  theme: {
    extend: {
      spacing: {
        '100': '25rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionProperty: {
        'width': 'width', 
      }
    },
  },
  plugins: [],
}
