'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-20 transition-all duration-300',
        isScrolled ? 'bg-white shadow-sm' : 'bg-[#763f97] shadow-lg'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-extrabold flex items-center gap-2 transition-colors">
          <HeartHandshake className={cn(isScrolled ? 'text-[#763f97]' : 'text-white')} />
          <span className={cn(isScrolled ? 'text-[#763f97]' : 'text-white')}>Пайванд</span>
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="/institutions"
            className={cn(
              'font-semibold transition-colors',
              isScrolled ? 'text-gray-700 hover:text-[#763f97]' : 'text-white hover:opacity-80'
            )}
          >
            Учреждения
          </Link>
          {/* ИСПРАВЛЕНО: Теперь здесь правильный цвет при прокрутке */}
          <Link
            href="/map"
            className={cn(
              'font-semibold transition-colors',
              isScrolled ? 'text-gray-700 hover:text-[#763f97]' : 'text-white hover:opacity-80'
            )}
          >
            Карта
          </Link>
          <Link
            href="/login"
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-bold shadow transition-colors',
              isScrolled
                ? 'bg-[#763f97] text-white hover:bg-[#763f97]/90'
                : 'bg-white text-[#763f97] hover:bg-gray-100'
            )}
          >
            Вход для сотрудников
          </Link>
        </nav>

        <button
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors focus:outline-none',
            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;