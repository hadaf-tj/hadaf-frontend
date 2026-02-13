/* FILE: components/layout/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, HeartHandshake, ChevronDown, ChevronRight } from 'lucide-react'; // Добавил ChevronDown
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

// --- ДАННЫЕ МЕНЮ С ВЛОЖЕННОСТЬЮ ---
const NAV_ITEMS = [
  {
    name: 'О нас',
    href: '/about',
    subItems: [
      { name: 'Миссия и ценности', href: '/about' },
      { name: 'Команда', href: '/team' }, // Страницу нужно будет создать или убрать этот пункт
      { name: 'Документы', href: '/docs' }, // Страницу нужно будет создать
    ]
  },
  {
    name: 'Волонтерам',
    href: '/volunteers', // Страницу нужно будет создать
    subItems: [
      { name: 'Как стать волонтером', href: '/volunteers' },
      { name: 'Частые вопросы (FAQ)', href: '/faq' },
      { name: 'Правила посещения', href: '/rules' },
    ]
  },
  { name: 'Отчеты', href: '/reports' },
  { name: 'Контакты', href: '/contacts' }, // Страницу нужно будет создать
];

interface HeaderProps {
  variant?: 'default' | 'colored';
}

const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Состояние для активного дропдауна (храним индекс элемента)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const useDarkColors = (isScrolled || variant === 'colored') && !isOpen;

  const headerBgClass = isOpen
    ? 'bg-[#1e3a8a]'
    : isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-sm'
      : 'bg-transparent';

  const textColorClass = isOpen
    ? 'text-white'
    : useDarkColors ? 'text-[#1e3a8a]' : 'text-white';

  const logoTextColorClass = isOpen
    ? 'text-white'
    : useDarkColors ? 'text-[#1e3a8a]' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isOpen ? 'h-full' : '',
        isScrolled ? 'py-2' : 'py-2',
        headerBgClass
      )}
      // Закрываем дропдаун, если мышь ушла с хедера
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div
        className={cn(
          "w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 flex items-start relative transition-all duration-200",
          isScrolled ? "h-12" : "h-12"
        )}
      >

        {/* --- ЛОГОТИП --- */}
        <Link href="/" className="flex items-center gap-1 sm:gap-3 group shrink-0 z-30 mr-8 lg:mr-12" onClick={() => setIsOpen(false)}>
          <div className={cn(
            "transition-transform duration-300 origin-left flex items-center gap-2 sm:gap-3",
            !isOpen && isScrolled ? "scale-90" : "scale-100"
          )}>
            <div className={cn(
              "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-colors",
              isOpen
                ? "bg-white/20 text-white"
                : useDarkColors
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white/20 backdrop-blur-sm text-white"
            )}>
              <HeartHandshake size={24} className="md:w-7 md:h-7" />
            </div>

            <div className="flex flex-col -space-y-1">
              <span className={cn(
                "text-xl md:text-2xl font-black tracking-tight transition-colors",
                logoTextColorClass
              )}>
                Ҳадаф
              </span>
            </div>
          </div>
        </Link>

        {/* --- НАВИГАЦИЯ (DESKTOP) С ДРОПДАУНАМИ --- */}
        <nav
          className={cn(
            "hidden xl:flex items-center gap-6 2xl:gap-10 z-30 h-full transition-all duration-300",
            isScrolled ? "mt-0" : "mb-4" // При скролле 4, без скролла 1 (подняли)
          )}
        >
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.name}
              className="relative h-full flex items-center"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <Link
                href={item.href}
                className={cn(
                  "font-bold text-sm 2xl:text-base hover:opacity-70 transition-opacity flex items-center gap-1 py-4",
                  textColorClass
                )}
              >
                {item.name}
                {/* Стрелочка вниз, если есть подпункты */}
                {item.subItems && (
                  <ChevronDown size={14} strokeWidth={3} className={cn("opacity-50 mt-0.5 transition-transform duration-200", hoveredIndex === index ? "rotate-180" : "")} />
                )}
              </Link>

              {/* --- САМ ВЫПАДАЮЩИЙ СПИСОК --- */}
              {item.subItems && (
                <div
                  className={cn(
                    "absolute top-full left-0 pt-4 w-64 transition-all duration-200 transform origin-top-left",
                    hoveredIndex === index
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  )}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setHoveredIndex(null)}
                        className="block px-4 py-3 text-sm font-bold text-gray-600 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
                useDarkColors
                  ? "bg-gray-100 text-[#1e3a8a] hover:bg-gray-200 border-l border-white/50"
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
        <div className="lg:hidden fixed inset-0 top-[60px] w-full bg-[#1e3a8a] z-40 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-5">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat opacity-20 mix-blend-overlay"></div>
          </div>
          <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-20 px-6 mt-8">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-white/10 last:border-0">
                  <Link
                    href={item.href}
                    className="text-white/90 font-bold text-xl py-4 hover:bg-white/10 px-4 rounded-xl transition-all flex items-center justify-between group"
                    onClick={() => !item.subItems && setIsOpen(false)}
                  >
                    {item.name}
                    {!item.subItems && <ChevronRight size={20} className="opacity-30 group-hover:opacity-100" />}
                  </Link>

                  {/* Подпункты в мобилке */}
                  {item.subItems && (
                    <div className="pl-8 pb-4 flex flex-col gap-2">
                      {item.subItems.map(sub => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="text-white/60 text-base font-medium py-1 hover:text-white"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto pt-8 flex flex-col gap-3 mb-8">
              <Button asChild className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold text-lg h-14 rounded-2xl w-full shadow-lg border-0">
                <Link href="/login" onClick={() => setIsOpen(false)}>Авторизоваться</Link>
              </Button>
              <Button asChild className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-lg h-14 rounded-2xl w-full">
                <Link href="/institutions" onClick={() => setIsOpen(false)}>Помочь</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;