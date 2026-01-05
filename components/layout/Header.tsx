/* FILE: components/layout/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  const textColorClass = isScrolled ? 'text-[#304663]' : 'text-white';
  const logoColorClass = isScrolled ? 'text-[#1e3a8a]' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' // <-- Было py-2. Ставим 0, чтобы убрать лишнюю высоту
          : 'bg-transparent py-4'
      )}
    >
      <div
        className={cn(
          "w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 flex items-start relative transition-all duration-300",
          // ВАЖНО: Добавил условие для высоты.
          // При скролле h-12 (48px), без скролла h-16 (64px) или h-14.
          isScrolled ? "h-12" : "h-16" 
        )}
      >
        
        {/* --- ЛОГОТИП --- */}
        {/* Добавил z-30, чтобы быть над фоном, но под мобильным меню если что */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 mt-1 z-30 mr-8 lg:mr-12">
          <div className={cn(
            "transition-transform duration-300 origin-left flex items-center gap-2 sm:gap-3",
            isScrolled ? "scale-90" : "scale-100"
          )}>
            <div className={cn(
              "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-colors",
              isScrolled ? "bg-[#1e3a8a] text-white" : "bg-white/20 backdrop-blur-sm text-white"
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
        {/* ИЗМЕНЕНИЕ 2: Спрятал на 'lg', показываю только на 'xl' (1280px+). 
           На 14 дюймах при зуме экран может стать меньше 1280px, тогда меню уйдет в бургер.
        */}
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
          
          {/* Иконки */}
          {/* ИЗМЕНЕНИЕ 3: mr-48 (для ноутбуков) -> lg:mr-80 -> xl:mr-96 (для больших экранов).
             Это двигает иконки влево, чтобы они не налезли на кнопки.
          */}
          <div className={cn("flex items-center gap-4 transition-colors mt-4 z-50 mr-[220px] xl:mr-[250px] 2xl:mr-[300px] relative", textColorClass)}> 
            <button className="hover:opacity-70 transition-opacity">
               <Search size={22} />
            </button>
            <Link href="/login" className="hover:opacity-70 transition-opacity">
               <User size={22} />
            </Link>
          </div>

          {/* БЛОК КНОПОК (FIXED) */}
          <div className={cn(
            "fixed top-0 right-0 flex items-start z-40",
          )}>
            
            {/* Кнопка "Помочь" (Желтая) */}
            <Button 
               asChild 
               className={cn(
                 "bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold relative z-10",
                 // Форма
                 "rounded-t-none rounded-r-none rounded-bl-[2rem] md:rounded-bl-[2.5rem]",
                 
                 // ИЗМЕНЕНИЕ 4: Адаптивные размеры. 
                 // На обычных ноутах (lg/xl) они компактнее. На 2xl (большие мониторы) становятся огромными.
                 "text-sm xl:text-base 2xl:text-lg", // Шрифт
                 "px-6 xl:px-6 2xl:px-6", // Отступы по бокам
                 "pr-10 xl:pr-14 2xl:pr-18", // Отступ справа, чтобы текст не налез на белую кнопку

                 // Высота
                 isScrolled 
                   ? "h-16 xl:h-16 2xl:h-16" 
                   : "h-16 xl:h-16 2xl:h-16",
                 
                 "transition-all duration-300"
               )}
            >
              <Link href="/institutions">Помочь</Link>
            </Button>

            {/* Кнопка "Нужна помощь" (Белая) */}
            <Button 
               asChild 
               className={cn(
                 "font-bold relative z-20",
                 isScrolled 
                    ? "bg-gray-100 text-[#1e3a8a] hover:bg-gray-200" 
                    : "bg-white text-[#1e3a8a] hover:bg-gray-100",
                 "rounded-t-none rounded-r-none rounded-bl-[2rem] md:rounded-bl-[2.5rem]",
                 
                 // ИЗМЕНЕНИЕ 5: Наложение и размеры
                 "-ml-8 xl:-ml-12 2xl:-ml-14", // Наезд влево
                 "pl-4 xl:pl-4 2xl:pl-8", // Компенсация текста слева
                 "pr-1 xl:pr-4 2xl:pr-8", // Отступ справа
                 "min-w-[160px] xl:min-w-[200px] 2xl:min-w-[240px]", // Мин ширина

                 // Шрифт
                 "text-sm xl:text-base 2xl:text-lg",

                 // Высота
                 isScrolled 
                    ? "h-16 xl:h-16 2xl:h-16" 
                    : "h-16 xl:h-16 2xl:h-16",

                 "transition-all duration-300"
               )}
            >
              <Link href="/about">Нужна помощь</Link>
            </Button>
          </div>
        </div>

        {/* --- МОБИЛЬНЫЕ ИКОНКИ (До LG) --- */}
        <div className="flex lg:hidden items-center gap-4 ml-auto mr-2 mt-2 z-50">
          <div className={cn("flex items-center gap-4", textColorClass)}> 
            <button className="hover:opacity-70 transition-opacity">
               <Search size={22} />
            </button>
            <Link href="/login" className="hover:opacity-70 transition-opacity">
               <User size={22} />
            </Link>
          </div>
        </div>

        {/* Мобильное меню бургер */}
        <button 
          className={cn("lg:hidden p-2 mt-1 z-50", textColorClass)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Выпадающее меню (MOBILE) */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1e3a8a] border-t border-white/10 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 h-[calc(100vh-60px)] overflow-y-auto">
           {[
            { name: 'Кто мы', href: '/about' },
            { name: 'Что мы делаем', href: '/institutions' },
            { name: 'Как помочь', href: '/map' },
            { name: 'Отчеты', href: '/reports' },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-white font-bold text-lg py-3 hover:bg-white/10 rounded-lg px-4 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
            <Button 
               asChild 
               className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold text-base h-12 rounded-full w-full"
            >
              <Link href="/institutions" onClick={() => setIsOpen(false)}>Помочь</Link>
            </Button>
            <Button 
               asChild 
               className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-bold text-base h-12 rounded-full w-full"
            >
              <Link href="/about" onClick={() => setIsOpen(false)}>Нужна помощь</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;