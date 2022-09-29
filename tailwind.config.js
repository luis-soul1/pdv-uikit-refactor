module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
    './commons/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'var(--transparent)',
      black: 'var(--black)',
      white: 'var(--white)',
      gray: {
        25: 'var(--gray-25)',
        50: 'var(--gray-50)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)',
        1000: 'var(--gray-1000)'
      },
      green: {
        50: 'var(--green-50)',
        100: 'var(--green-100)',
        200: 'var(--green-200)',
        300: 'var(--green-300)',
        400: 'var(--green-400)',
        500: 'var(--green-500)',
        600: 'var(--green-600)',
        700: 'var(--green-700)',
        800: 'var(--green-800)',
        900: 'var(--green-900)'
      },
      esmerald: {
        50: 'var(--esmerald-50)',
        100: 'var(--esmerald-100)',
        200: 'var(--esmerald-200)'
      },
      teal: {
        300: 'var(--teal-300)',
        400: 'var(--teal-400)',
        500: 'var(--teal-500)',
        600: 'var(--teal-600)'
      },
      sky: {
        50: 'var(--sky-50)',
        100: 'var(--sky-100)',
        200: 'var(--sky-200)',
        700: 'var(--sky-700)',
        800: 'var(--sky-800)'
      },
      blue: {
        50: 'var(--blue-50)',
        75: 'var(--blue-75)',
        100: 'var(--blue-100)',
        150: 'var(--blue-150)',
        200: 'var(--blue-200)',
        300: 'var(--blue-300)',
        400: 'var(--blue-400)',
        500: 'var(--blue-500)',
        600: 'var(--blue-600)',
        700: 'var(--blue-700)',
        800: 'var(--blue-800)',
        900: 'var(--blue-900)'
      },
      indigo: {
        25: 'var(--indigo-25)',
        50: 'var(--indigo-50)',
        100: 'var(--indigo-100)',
        200: 'var(--indigo-200)',
        300: 'var(--indigo-300)',
        400: 'var(--indigo-400)',
        500: 'var(--indigo-500)',
        600: 'var(--indigo-600)',
        700: 'var(--indigo-700)',
        800: 'var(--indigo-800)'
      },
      purple: {
        25: 'var(--purple-25)',
        50: 'var(--purple-50)',
        100: 'var(--purple-100)',
        150: 'var(--purple-150)',
        200: 'var(--purple-200)',
        250: 'var(--purple-250)',
        300: 'var(--purple-300)',
        500: 'var(--purple-500)',
        600: 'var(--purple-600)',
        800: 'var(--purple-800)'
      },
      fuchsia: {
        400: 'var(--fuchsia-400)'
      },
      red: {
        50: 'var(--red-50)',
        100: 'var(--red-100)',
        200: 'var(--red-200)',
        300: 'var(--red-300)',
        400: 'var(--red-400)',
        500: 'var(--red-500)',
        600: 'var(--red-600)',
        700: 'var(--red-700)',
        900: 'var(--red-900)'
      },
      rose: {
        100: 'var(--rose-100)',
        300: 'var(--rose-300)',
        350: 'var(--rose-350)',
        400: 'var(--rose-400)',
        500: 'var(--rose-500)',
        600: 'var(--rose-600)',
        700: 'var(--rose-700)'
      },
      orange: {
        50: 'var(--orange-50)',
        100: 'var(--orange-100)',
        200: 'var(--orange-200)',
        300: 'var(--orange-300)',
        400: 'var(--orange-400)',
        500: 'var(--orange-500)',
        600: 'var(--orange-600)',
        700: 'var(--orange-700)'
      },
      yellow: {
        50: 'var(--yellow-50)',
        100: 'var(--yellow-100)',
        200: 'var(--yellow-200)',
        250: 'var(--yellow-250)',
        300: 'var(--yellow-300)',
        400: 'var(--yellow-400)',
        500: 'var(--yellow-500)',
        600: 'var(--yellow-600)',
        700: 'var(--yellow-700)',
        800: 'var(--yellow-800)',
        900: 'var(--yellow-900)'
      }
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px'
      }
    },
    extend: {
      boxShadow: {
        16: 'var(--shadow-gray--016)'
      }
    }
  },
  plugins: [],
  important: true
}
