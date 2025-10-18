// /components/layout/MainLayout.tsx
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Убеждаемся, что центральный контент не растягивается слишком широко
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // bg-gray-50 теперь установлен в globals.css, здесь просто flex-col
    <div className="flex flex-col min-h-screen"> 
      <Header />
      {/* Важно: max-w-7xl ограничивает контейнер на больших экранах (1300+ px) */}
      <main className="flex-grow container mx-auto **max-w-7xl** px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
