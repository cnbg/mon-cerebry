/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['selector', '[class="p-dark"]'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/*/.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '440px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}
