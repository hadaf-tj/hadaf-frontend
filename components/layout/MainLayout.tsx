/* FILE: components/layout/MainLayout.tsx */
'use client';

import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // min-h-screen и flex-col прижимают футер к низу
    // bg-[#f8fafc] задает цвет фона на всю страницу
    <div className="flex flex-col min-h-screen bg-[#f3f9ff]">
      <Header />
      
      {/* flex-grow заставляет контент занимать все свободное место */}
      <main className="flex-grow w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;