/* FILE: app/layout.tsx */
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import SplashScreen from '@/components/ui/SplashScreen';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/ui/CookieBanner';

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
        <Providers>
          <SplashScreen />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}