/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm':{'min': '441px','max':'880px' },
      'md': '881px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl':'1540px',
      'phone': { 'raw': '(max-width: 440px)' },
    },
  },
  plugins: [],
}

