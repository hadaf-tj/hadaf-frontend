/* FILE: components/layout/MainLayout.tsx */
'use client';

import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Number.isNaN(progress) ? 0 : progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* 1. ФОН:
        Убраны градиенты и пульсация.
        Оставлен чистый светлый фон и статичная, едва заметная сетка для "дорогой" текстуры.
      */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#F9FAFB]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzlDNzAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaC0ydi0yaDJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0tMiAwdi0yaC0ydjJoMnptLTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTItMnYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main 
        className={`
          flex-grow 
          pt-28 
          pb-10
          transition-opacity 
          duration-500
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative z-10">
              {children}
            </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* 2. ИНДИКАТОР СКРОЛЛА:
        Убраны переливания (gradient). Теперь это строгая полоса фирменного цвета.
      */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[100]">
        <div 
          className="h-full bg-[#763f97] "
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default MainLayout;