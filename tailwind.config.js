/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#BD202F',
        gray: {
          DEFAULT: '#E5E5EB', // border color
          100: '#F5F6F7',
          200: '#ECEEEE',
          300: '#F0F2F5',
          400: '#76767A',
          500: '#65676B',
        },
        black: {
          DEFAULT: '#000000',
          100: '#1F2937',
          200: '#55575C',
        },
        red: {
          100: '#EFC9CD',
        },
        green: {
          DEFAULT: '#6FBD20',
        },
        yellow: {
          DEFAULT: '#DE9505',
          100: 'rgba(245, 166, 11, 0.12)',
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#BD202F',
          accent: '#6FBD20',
          neutral: '#F0F2F5',
        },
      },
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
