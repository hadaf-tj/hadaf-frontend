'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HeartHandshake, Phone, Mail, LogIn, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className="w-full z-[1000] relative font-sans">
      
      {/* 1. ВЕРХНЯЯ ИНФО-ПОЛОСА (Top Bar) */}
      {/* Видна только на десктопе, создает ощущение серьезной организации */}
      <div className="bg-[#f7f9fe] border-b border-[#e2e8f0] hidden lg:block text-xs font-medium text-[#64748b]">
        <div className="container mx-auto max-w-7xl px-4 h-10 flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+992000000000" className="flex items-center gap-2 hover:text-[#763f97] transition-colors">
              <Phone size={14} className="text-[#763f97]" /> 
              <span>+992 00 000 00 00</span>
            </a>
            <a href="mailto:info@payvand.tj" className="flex items-center gap-2 hover:text-[#763f97] transition-colors">
              <Mail size={14} className="text-[#763f97]" /> 
              <span>info@payvand.tj</span>
            </a>
          </div>
          <div className="flex gap-6 items-center">
             {/* Вход переехал сюда, чтобы не мешать кнопке "Помочь" */}
             {isLoggedIn ? (
               <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="hover:text-[#763f97] flex items-center gap-1">
                    <User size={14} /> <b>Сиёвуш</b> (Панель)
                  </Link>
                  <button onClick={handleLogout} className="hover:text-red-500">Выйти</button>
               </div>
             ) : (
               <Link href="/login" className="flex items-center gap-1.5 hover:text-[#763f97] transition-colors">
                  <LogIn size={14} /> Вход для сотрудников
               </Link>
             )}
          </div>
        </div>
      </div>

      {/* 2. ОСНОВНОЙ HEADER (Sticky) */}
      <header
        className={cn(
          'sticky top-0 w-full transition-all duration-300 border-b border-transparent z-50',
          // При скролле - белый с тенью, Иначе - белый (чистый)
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
          
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#763f97] text-white rounded-xl shadow-lg shadow-[#763f97]/20 group-hover:scale-105 transition-transform duration-300">
              <HeartHandshake size={22} />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-extrabold text-[#304663] tracking-tight">Пайванд</span>
              <span className="text-[10px] font-bold text-[#869cb9] uppercase tracking-widest">Адресная помощь</span>
            </div>
          </Link>

          {/* Навигация (Центр) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f7f9fe] p-1.5 rounded-full border border-[#e2e8f0]">
            {[
              { name: 'Кому помогаем', href: '/institutions' },
              { name: 'Карта', href: '/map' },
              { name: 'О фонде', href: '/about' },
              { name: 'Отчеты', href: '/reports' }
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="px-5 py-2 rounded-full text-sm font-bold text-[#304663] hover:bg-white hover:text-[#763f97] hover:shadow-sm transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Правая часть: CTA Кнопка */}
          <div className="hidden lg:flex items-center">
            <Button 
                asChild 
                className="bg-[#ffca63] text-[#763f97] hover:bg-[#ffd685] hover:-translate-y-0.5 font-extrabold rounded-full px-7 h-11 shadow-lg shadow-[#ffca63]/20 transition-all"
            >
              <Link href="/institutions" className="flex items-center gap-2">
                 Хочу помочь <ChevronRight size={16} strokeWidth={3} />
              </Link>
            </Button>
          </div>

          {/* Гамбургер (Мобильный) */}
          <button
            className="lg:hidden p-2.5 text-[#304663] bg-[#f7f9fe] hover:bg-[#e2e8f0] rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* МОБИЛЬНОЕ МЕНЮ (Выезжает красиво) */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-[#e2e8f0] shadow-2xl flex flex-col p-4 animate-in slide-in-from-top-2 min-h-screen">
            <div className="space-y-2">
              {[
                { name: 'Кому помогаем', href: '/institutions' },
                { name: 'Карта помощи', href: '/map' },
                { name: 'О фонде', href: '/about' },
                { name: 'Отчеты', href: '/reports' }
              ].map((item) => (
                 <Link 
                    key={item.name}
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#f7f9fe] text-[#304663] font-bold text-lg active:scale-[0.98] transition-transform"
                 >
                    {item.name}
                    <ChevronRight size={20} className="text-[#763f97]" />
                 </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-[#e2e8f0] space-y-4">
                {isLoggedIn ? (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-[#763f97] text-[#763f97] font-bold">
                        <User size={20} /> Панель управления
                    </Link>
                ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-[#e2e8f0] text-[#64748b] font-bold">
                        <LogIn size={20} /> Вход для сотрудников
                    </Link>
                )}
                
                <Link href="/institutions" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-[#ffca63] text-[#763f97] font-extrabold shadow-lg shadow-[#ffca63]/30">
                    Хочу помочь
                </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;