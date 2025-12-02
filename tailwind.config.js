/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E', // 메인 그린 컬러
          dark: '#16A34A',
          light: '#4ADE80',
        },
        secondary: {
          DEFAULT: '#F3F4F6', // 그레이 배경
          dark: '#E5E7EB',
        }
      },
      screens: {
        'mobile': '375px',
        'mobile-lg': '428px',
      }
    },
  },
  plugins: [],
}

