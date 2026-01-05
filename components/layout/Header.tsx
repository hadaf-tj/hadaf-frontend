'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HeartHandshake, LogIn, User, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  if (isDashboard) return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || isOpen 
          ? 'bg-white/95 backdrop-blur-2xl shadow-lg py-3 border-b border-gray-100' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
        
        {/* Логотип - более выразительный */}
        <Link href="/" className="flex items-center gap-3 group relative">
          {/* Светящийся эффект под логотипом */}
          <div className="absolute inset-0 bg-[#763f97] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-150"></div>
          
          <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#763f97] to-[#9d5cb5] text-white rounded-2xl shadow-xl shadow-[#763f97]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <HeartHandshake size={24} className="relative z-10" />
            {/* Пульсирующее кольцо */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#763f97] scale-110 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000"></div>
          </div>
          
          <div className="flex flex-col -space-y-1">
            <span className={cn(
              "text-2xl md:text-3xl font-black tracking-tight transition-all duration-300 bg-gradient-to-r from-[#304663] to-[#763f97] bg-clip-text",
              isScrolled ? "text-transparent" : "text-[#304663]"
            )}>
              Пайванд
            </span>
            <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Помогаем вместе
            </span>
          </div>
        </Link>

        {/* Навигация (Десктоп) - стеклянный эффект */}
        <nav className="hidden lg:flex items-center bg-white/60 backdrop-blur-2xl p-2 rounded-full border border-gray-200/50 shadow-xl">
          {[
            { name: 'Кому помогаем', href: '/institutions' },
            { name: 'Карта', href: '/map' },
            { name: 'О фонде', href: '/about' },
            { name: 'Отчеты', href: '/reports' },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={cn(
                  "relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-[#763f97] to-[#9d5cb5] text-white shadow-lg shadow-[#763f97]/30" 
                    : "text-[#304663] hover:bg-white hover:text-[#763f97] hover:shadow-md"
                )}
              >
                {item.name}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#763f97] scale-110 animate-pulse opacity-30"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Правая часть: Вход / Кнопка */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
             asChild 
             className="bg-gradient-to-r from-[#763f97] to-[#9d5cb5] text-white hover:from-[#9d5cb5] hover:to-[#763f97] font-black rounded-full px-8 h-12 shadow-xl shadow-[#763f97]/30 hover:shadow-2xl hover:shadow-[#763f97]/40 hover:scale-105 transition-all duration-300 group"
          >
            <Link href="/institutions" className="flex items-center gap-2">
               {/* <Sparkles size={18} className="group-hover:animate-spin"/> */}
               Хочу помочь
            </Link>
          </Button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all">
               <Link href="/dashboard" className="text-sm font-bold text-[#304663] hover:text-[#763f97] flex items-center gap-2 transition-colors">
                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#763f97] to-[#9d5cb5] flex items-center justify-center text-white shadow-md">
                    <User size={18} />
                 </div>
                 <span>Кабинет</span>
               </Link>
               <div className="w-[1px] h-5 bg-gray-300"></div>
               <button 
                 onClick={handleLogout} 
                 className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors px-2"
               >
                 Выйти
               </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-sm font-bold text-[#64748b] hover:text-[#763f97] transition-all duration-300 px-4 py-2 rounded-full hover:bg-gray-100"
            >
              <LogIn size={18} />
              <span>Войти</span>
            </Link>
          )}
        </div>

        {/* Мобильное меню (Гамбургер) - улучшенная анимация */}
        <button 
          className={cn(
            "lg:hidden p-2 rounded-xl transition-all duration-300",
            isOpen ? "bg-[#763f97] text-white" : "bg-gray-100 text-[#304663]"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Выпадающее мобильное меню - улучшенный дизайн */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-2xl animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto max-w-7xl px-4 py-6">
            <div className="flex flex-col gap-3 mb-6">
              {[
                { name: 'Кому помогаем', href: '/institutions' },
                { name: 'Карта помощи', href: '/map' },
                { name: 'О фонде', href: '/about' },
                { name: 'Отчеты', href: '/reports' }
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl font-bold text-lg transition-all duration-300",
                      isActive 
                        ? "bg-gradient-to-r from-[#763f97] to-[#9d5cb5] text-white shadow-lg" 
                        : "bg-gray-50 text-[#304663] hover:bg-gray-100"
                    )}
                  >
                    {item.name}
                    <ChevronRight size={22} className={cn(
                      "transition-transform",
                      isActive ? "text-white" : "text-[#763f97] opacity-50"
                    )} />
                  </Link>
                );
              })}
            </div>
            
            <div className="pt-6 border-t border-dashed border-gray-200 grid gap-3">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 py-4 rounded-2xl border-2 border-[#763f97] text-[#763f97] font-bold hover:bg-[#763f97] hover:text-white transition-all"
                  >
                    <User size={20}/>
                    Личный кабинет
                  </Link>
                  <button 
                    onClick={() => {handleLogout(); setIsOpen(false);}}
                    className="py-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 py-4 rounded-2xl border border-gray-200 text-[#64748b] font-bold hover:bg-gray-50 transition-all"
                >
                  <LogIn size={20}/>
                  Вход
                </Link>
              )}
              <Link 
                href="/institutions" 
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#763f97] to-[#9d5cb5] text-white font-black shadow-lg shadow-[#763f97]/30 hover:shadow-xl transition-all"
              >
                <Sparkles size={20}/>
                Хочу помочь
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;