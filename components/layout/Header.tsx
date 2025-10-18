// /components/layout/Header.tsx
'use client'; 
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Улучшаем стили: более темный фон (blue-800), четкая тень (shadow-2xl)
    <header className="bg-blue-800 text-white shadow-2xl sticky top-0 z-20"> 
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:text-blue-300 transition-colors">
          <span className="text-3xl mr-2">🤝</span> Соц. Мост
        </Link>
        {/* Десктопная навигация */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/institutions" className="hover:text-blue-300 transition-colors font-medium">
            Учреждения
          </Link>
          <Link href="/map" className="hover:text-blue-300 transition-colors font-medium">
            Карта
          </Link>
          {/* Кнопка с более заметным фоном и тенью */}
          <Link href="/login" className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 text-sm font-bold shadow-lg">
            Вход для Сотрудников
          </Link>
        </nav>
        {/* Кнопка для мобильного меню */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Мобильное меню (скрывается на md и выше) */}
      {isOpen && (
        <nav className="md:hidden bg-blue-900 absolute w-full z-10 shadow-xl transition-all duration-300 ease-in-out">
          <Link onClick={() => setIsOpen(false)} href="/institutions" className="block p-4 border-t border-blue-700 hover:bg-blue-700 transition-colors">
            Учреждения
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/map" className="block p-4 border-t border-blue-700 hover:bg-blue-700 transition-colors">
            Карта
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/login" className="block p-4 border-t border-blue-700 bg-blue-600 hover:bg-blue-700 transition-colors font-bold">
            Вход для Сотрудников
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
