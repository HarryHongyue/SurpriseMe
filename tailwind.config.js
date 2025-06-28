/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base theme (blue)
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#0072f5',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        // Purple theme
        purple: {
          50: '#f5e9ff',
          100: '#ead3ff',
          200: '#d5a6ff',
          300: '#c07aff',
          400: '#ab4dff',
          500: '#9621ff',
          600: '#781acc',
          700: '#5a1499',
          800: '#3c0e66',
          900: '#1e0733',
        },
        // Green theme
        green: {
          50: '#e6fff4',
          100: '#ccffe9',
          200: '#99ffd3',
          300: '#66ffbd',
          400: '#33ffa7',
          500: '#00ff91',
          600: '#00cc74',
          700: '#009957',
          800: '#00663a',
          900: '#00331d',
        },
        // Orange theme
        orange: {
          50: '#fff2e6',
          100: '#ffe6cc',
          200: '#ffcc99',
          300: '#ffb366',
          400: '#ff9933',
          500: '#ff8000',
          600: '#cc6600',
          700: '#994d00',
          800: '#663300',
          900: '#331a00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
