/* FILE: components/layout/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, HeartHandshake, LogIn, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  // ЛОГИКА ЦВЕТОВ:
  // Если меню открыто (isOpen) -> Всегда белый текст и синий фон
  // Если меню закрыто -> Зависит от скролла
  
  const headerBgClass = isOpen 
    ? 'bg-[#1e3a8a]' // Синий фон при открытом меню (закрывает Hero)
    : isScrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-sm' 
      : 'bg-transparent';

  const textColorClass = isOpen 
    ? 'text-white' 
    : isScrolled ? 'text-[#304663]' : 'text-white';

  const logoColorClass = isOpen 
    ? 'text-white' 
    : isScrolled ? 'text-[#1e3a8a]' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isOpen ? 'h-full' : '', // При открытии меню хедер занимает весь экран (для фиксации фона)
        // Но визуально мы красим только верхнюю полосу через headerBgClass, а остальное делает меню
        // Однако, для headerBgClass лучше управлять только верхней панелью, а h-full убрать отсюда, 
        // иначе fixed перекроет скролл контента. Оставим стандартную высоту.
        isScrolled ? 'py-2' : 'py-4',
        headerBgClass // Применяем фон
      )}
    >
      <div
        className={cn(
          "w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 flex items-start relative transition-all duration-300",
          isScrolled ? "h-12" : "h-16" 
        )}
      >
        
        {/* --- ЛОГОТИП --- */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 mt-1 z-30 mr-8 lg:mr-12" onClick={() => setIsOpen(false)}>
          <div className={cn(
            "transition-transform duration-300 origin-left flex items-center gap-2 sm:gap-3",
            !isOpen && isScrolled ? "scale-90" : "scale-100"
          )}>
            <div className={cn(
              "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-colors",
              // Если меню открыто - логотип на синем фоне (прозрачный/белый)
              isOpen 
                ? "bg-white/20 text-white" 
                : isScrolled ? "bg-[#1e3a8a] text-white" : "bg-white/20 backdrop-blur-sm text-white"
            )}>
              <HeartHandshake size={24} className="md:w-7 md:h-7" />
            </div>
            
            <div className="flex flex-col -space-y-1">
              <span className={cn(
                "text-xl md:text-2xl font-black tracking-tight transition-colors",
                logoColorClass
              )}>
                Пайванд
              </span>
            </div>
          </div>
        </Link>

        {/* --- НАВИГАЦИЯ (DESKTOP) --- */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-10 mt-4 z-30">
          {[
            { name: 'Кто мы', href: '/about' },
            { name: 'Что мы делаем', href: '/institutions' },
            { name: 'Как помочь', href: '/map' },
            { name: 'Отчеты', href: '/reports' },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className={cn(
                "font-bold text-sm 2xl:text-base hover:opacity-70 transition-opacity flex items-center gap-1",
                textColorClass
              )}
            >
              {item.name}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50">
                 <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </nav>

        {/* --- ПРАВАЯ ЧАСТЬ (DESKTOP) --- */}
        <div className="hidden lg:flex items-start justify-end ml-auto">
          <div className={cn("flex items-center gap-4 transition-colors mt-4 z-50 mr-[220px] xl:mr-[250px] 2xl:mr-[300px] relative", textColorClass)}> 
            <button className="hover:opacity-70 transition-opacity">
               <Search size={22} />
            </button>
            <Link href="/login" className="hover:opacity-70 transition-opacity">
               <User size={22} />
            </Link>
          </div>

          <div className={cn("fixed top-0 right-0 flex items-start z-40")}>
            <Button 
               asChild 
               className={cn(
                 "bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold relative z-10",
                 "rounded-t-none rounded-r-none rounded-bl-[2rem] md:rounded-bl-[2.5rem]",
                 "text-sm xl:text-base 2xl:text-lg", 
                 "px-6 xl:px-6 2xl:px-6", 
                 "pr-10 xl:pr-14 2xl:pr-18", 
                 isScrolled ? "h-16" : "h-16",
                 "transition-all duration-300"
               )}
            >
              <Link href="/institutions">Помочь</Link>
            </Button>

            <Button 
               asChild 
               className={cn(
                 "font-bold relative z-20",
                 isScrolled 
                    ? "bg-gray-100 text-[#1e3a8a] hover:bg-gray-200" 
                    : "bg-white text-[#1e3a8a] hover:bg-gray-100",
                 "rounded-t-none rounded-r-none rounded-bl-[2rem] md:rounded-bl-[2.5rem]",
                 "-ml-8 xl:-ml-12 2xl:-ml-14", 
                 "pl-4 xl:pl-4 2xl:pl-8", 
                 "pr-1 xl:pr-4 2xl:pr-8", 
                 "min-w-[160px] xl:min-w-[200px] 2xl:min-w-[240px]", 
                 "text-sm xl:text-base 2xl:text-lg",
                 isScrolled ? "h-16" : "h-16",
                 "transition-all duration-300"
               )}
            >
              <Link href="/about">Нужна помощь</Link>
            </Button>
          </div>
        </div>

        {/* МОБИЛЬНЫЙ БУРГЕР */}
        <button 
          className={cn("lg:hidden p-2 mt-1 z-50 ml-auto", textColorClass)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* --- ВЫПАДАЮЩЕЕ МЕНЮ (MOBILE) --- */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] w-full bg-[#1e3a8a] z-40 overflow-hidden flex flex-col">
          {/* top-[60px] или top-[heightHeader], чтобы меню начиналось ровно под синей шапкой */}
          
          {/* Орнамент */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat opacity-25 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-20 px-6 mt-16">

            {/* 2. НАВИГАЦИЯ */}
            <div className="flex flex-col gap-2">
               {[
                { name: 'Кто мы', href: '/about' },
                { name: 'Что мы делаем', href: '/institutions' },
                { name: 'Как помочь', href: '/map' },
                { name: 'Отчеты', href: '/reports' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-white/90 font-bold text-xl py-4 border-b border-white/10 hover:bg-white/10 px-4 rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-100 transition-opacity">
                     <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              ))}
            </div>

            {/* 3. ВТОРОСТЕПЕННЫЕ КНОПКИ */}
            <div className="mt-auto pt-8 flex flex-col gap-3 mb-8">
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest text-center mb-2">Быстрые действия</div>
               <Button 
                 asChild 
                 className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold text-lg h-14 rounded-2xl w-full shadow-lg border-0"
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>Авторизоваться</Link>
              </Button>
              <Button 
                 asChild 
                 className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-lg h-14 rounded-2xl w-full"
              >
                <Link href="/institutions" onClick={() => setIsOpen(false)}>Помочь</Link>
              </Button>
              <Button 
                 asChild 
                 className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-lg h-14 rounded-2xl w-full"
              >
                <Link href="/about" onClick={() => setIsOpen(false)}>Нужна помощь</Link>
              </Button>
             
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;