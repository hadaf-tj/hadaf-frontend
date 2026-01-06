/* FILE: app/layout.tsx */
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
});

export const metadata = {
  title: 'Пайванд: Адресная Помощь',
  description: 'Платформа для прозрачной помощи социальным учреждениям Таджикистана.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={montserrat.className}>
        {/* Мы убрали отсюда MainLayout. Теперь каждая страница сама (или через template) решает, какой ей нужен Layout */}
        {children}
      </body>
    </html>
  );
}