/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7
      },
      colors: {
        'regal-blue': '#243c5a',
        'navy': '#0a192f',
        'dark-navy': '#020c1b',
        'light-navy': '#112240',
        'slate': '#8892b0',
        'light-slate': '#a8b2d1',
        'lightest-slate': '#ccd6f6',
        'special-green': '#64ffda'
      },
      minWidth: {
        '1/2': '50%',
        '1/4': '25%',
        '1/8': '12.5%',
      },
      fontFamily: {
        RobotoMono: "'Roboto Mono', monospace"
      }
    },

  },
  plugins: [],
}
