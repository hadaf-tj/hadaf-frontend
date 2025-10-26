import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f9fe',
        'on-primary': '#ffffff',
        primary: {
          light: '#9851c2',
          DEFAULT: '#763f97',
        },
        // Добавляем ваш желтый цвет для срочных нужд
        urgent: '#ffca63',
      },
    },
  },
  plugins: [],
};
export default config;