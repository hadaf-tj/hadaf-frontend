import '../styles/globals.css'; // Ваш файл globals.css, настроенный Tailwind
import MainLayout from '@/components/layout/MainLayout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Социальный Мост: Адресная Помощь',
  description: 'Платформа для прозрачной помощи социальным учреждениям.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* MainLayout оборачивает все страницы */}
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
