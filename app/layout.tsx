import '../styles/globals.css';
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
    // 3. ИСПРАВЛЕНЫ ПУТИ: Пути должны быть абсолютными от /public
    icon: '/favicon.ico', // /public/favicon.ico
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // /public/apple-touch-icon.png
    android: '/android-chrome-512x512.png', // /public/android-chrome-512x512.png
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      {/* 4. Применяем класс шрифта */}
      <body className={montserrat.className}>
        {/*
          БОЛЬШЕ ЗДЕСЬ НЕТ <MainLayout>
          Он переезжает в app/(public)/layout.tsx
        */}
        {children}
      </body>
    </html>
  );
}