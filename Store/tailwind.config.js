/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E6E68', // 메인 틸 컬러
        secondary: {
          DEFAULT: '#F3F4F6', // 그레이 배경
          dark: '#E5E7EB',
        }
      },
    },
  },
  plugins: [],
}

