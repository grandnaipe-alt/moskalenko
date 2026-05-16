export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#e8eeff',
          100: '#c5d2ff',
          200: '#9aadff',
          300: '#6685ff',
          400: '#3a60ff',
          500: '#1230A0',
          600: '#0e2585',
          700: '#0b1c6a',
          800: '#071350',
          900: '#040b35',
        },
        surface: {
          950: '#04081a',
          900: '#070e24',
          800: '#0b152e',
          700: '#101c3a',
          600: '#162246',
          500: '#1c2952',
        }
      },
    },
  },
  plugins: [],
}
