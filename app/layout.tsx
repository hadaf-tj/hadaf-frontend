/* FILE: app/layout.tsx */
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import SplashScreen from '@/components/ui/SplashScreen';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
});

export const metadata = {
  title: 'Ҳадаф: Адресная Помощь',
  description: 'Платформа для прозрачной помощи социальным учреждениям Таджикистана.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={montserrat.className}>
        <SplashScreen />
        {/* Мы убрали отсюда MainLayout. Теперь каждая страница сама (или через template) решает, какой ей нужен Layout */}
        {children}
      </body>
    </html>
  );
}