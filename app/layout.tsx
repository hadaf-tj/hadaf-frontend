import '../styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';
// 1. Импортируем Montserrat с нужными начертаниями
import { Montserrat } from 'next/font/google';

// 2. Инициализируем шрифт
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'], // Загружаем несколько весов
});

export const metadata = {
  title: 'Пайванд: Адресная Помощь',
  description: 'Платформа для прозрачной помощи социальным учреждениям Таджикистана.',
  icons: {
    icon: 'favicon.ico', // Основная иконка 
    shortcut: '/favicon.ico', // Для старых браузеров
    apple: '../public/apple-touch-icon.png', // Для устройств Apple
    android: '../public/android-chrome-512x512.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      {/* 3. Применяем класс нового шрифта */}
      <body className={montserrat.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}