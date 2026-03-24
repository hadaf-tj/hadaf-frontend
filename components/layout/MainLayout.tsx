/* FILE: components/layout/MainLayout.tsx */
'use client';

import Header from './Header';
import Footer from './Footer';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleApiError = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        toast.error(customEvent.detail, {
          duration: 3000,
          position: 'top-center',
          icon: '⚠️',
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '12px'
          }
        });
      }
    };
    
    window.addEventListener('api-error', handleApiError);
    return () => window.removeEventListener('api-error', handleApiError);
  }, []);

  return (
    // min-h-screen и flex-col прижимают футер к низу
    // bg-[#f8fafc] задает цвет фона на всю страницу
    <div className="flex flex-col min-h-screen bg-[#f3f9ff]">
      <Toaster />
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