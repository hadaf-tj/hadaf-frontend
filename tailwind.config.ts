import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ИСПРАВЛЕНИЕ 1: darkMode должен быть строкой, а не массивом
  darkMode: "class", 
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
  // ИСПРАВЛЕНИЕ 2: Убрали require("tailwindcss-animate"), так как пакет не установлен
  plugins: [], 
};
export default config;