/* FILE: components/layout/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, HeartHandshake, ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/AuthContext';

// --- ДАННЫЕ МЕНЮ ---
const NAV_ITEMS = [
  { name: 'О нас', href: '/about' },
  { name: 'Учреждения', href: '/institutions' },
  { name: 'События', href: '/events' },
  { name: 'Контакты', href: '/contacts' },
];

interface HeaderProps {
  variant?: 'default' | 'colored';
}

const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading, logout } = useAuth();

  // Состояние для активного дропдауна (храним индекс элемента)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Состояние раскрытых подменю в мобильной версии
  const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([]);

  const toggleMobileMenu = (name: string) => {
    setOpenMobileMenus(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenMobileMenus([]);
  }, [pathname]);

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
        className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 h-12 flex items-center relative transition-colors duration-300"
      >

        {/* --- ЛОГОТИП --- */}
        <Link href="/" className="flex items-center gap-1 sm:gap-3 group shrink-0 z-30 mr-8 lg:mr-12" onClick={() => setIsOpen(false)}>
          <div className={cn(
            "transition-all duration-300 origin-left flex items-center gap-2 sm:gap-3"
          )}>
            <div className={cn(
              "flex items-center justify-center rounded-xl transition-all duration-300",
              isScrolled ? "w-9 h-9 md:w-10 md:h-10" : "w-10 h-10 md:w-12 md:h-12",
              isOpen
                ? "bg-white/20 text-white"
                : useDarkColors
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white/20 backdrop-blur-sm text-white"
            )}>
              <HeartHandshake size={isScrolled ? 20 : 24} className="transition-all duration-300" />
            </div>

            <div className="flex flex-col -space-y-1">
              <span className={cn(
                "font-black tracking-tight transition-all duration-300",
                isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
                logoTextColorClass
              )}>
                Ҳадаф
              </span>
            </div>
          </div>
        </Link>

        {/* --- НАВИГАЦИЯ (DESKTOP) --- */}
        <nav
          className="hidden xl:flex items-center gap-6 2xl:gap-10 z-30 h-full transition-colors duration-300"
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative h-full flex items-center"
            >
              <Link
                href={item.href}
                className={cn(
                  "font-bold text-sm 2xl:text-base hover:opacity-70 transition-opacity flex items-center gap-1 py-4",
                  textColorClass
                )}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* --- ПРАВАЯ ЧАСТЬ (DESKTOP) --- */}
        <div className="hidden lg:flex items-center justify-end ml-auto h-full">
          <div className={cn("flex items-center gap-4 transition-colors z-50 mr-[calc(220px+6vw)] xl:mr-[calc(250px+6vw)] 2xl:mr-[calc(300px+6vw)] absolute right-0 top-1/2 -translate-y-1/2", textColorClass)}>
            {!isLoading && user ? (
              <>
                <Link href="/dashboard" className="hover:opacity-70 transition-opacity flex items-center gap-2" title="Мой профиль">
                  <User size={22} />
                  <span className="text-sm font-bold hidden xl:inline">{user.full_name?.split(' ')[0] || 'Профиль'}</span>
                </Link>
                <button onClick={logout} className="hover:opacity-70 transition-opacity" title="Выйти">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:opacity-70 transition-opacity flex items-center h-full" title="Войти">
                <User size={22} />
              </Link>
            )}
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
                "h-16",
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
                "h-16 transition-colors duration-300"
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
        <div className="lg:hidden fixed inset-0 top-[60px] w-full bg-[#1e3a8a] z-40 flex flex-col animate-in fade-in slide-in-from-top-5">
          <div className="relative z-10 flex flex-col flex-1 overflow-y-auto pt-8">
            <div className="flex flex-col gap-1 px-6 pb-20">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-white/10 last:border-0 relative">
                  <Link
                    href={item.href}
                    className="text-white/90 font-bold text-xl py-4 hover:bg-white/10 px-4 rounded-xl transition-colors flex items-center justify-between group"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pb-4 pt-4 flex flex-col gap-2 w-[90%] mx-auto">
              {!isLoading && user ? (
                <>
                  <Button asChild className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold text-base sm:text-lg h-12 sm:h-14 rounded-2xl w-full shadow-md border-0 shrink-0">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>Мой профиль</Link>
                  </Button>
                  <Button
                    onClick={() => { setIsOpen(false); logout(); }}
                    className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-base sm:text-lg h-12 sm:h-14 rounded-2xl w-full shrink-0"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-bold text-base sm:text-lg h-12 sm:h-14 rounded-2xl w-full shadow-md border-0 shrink-0">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Авторизоваться</Link>
                  </Button>
                  <Button asChild className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-base sm:text-lg h-12 sm:h-14 rounded-2xl w-full shrink-0">
                    <Link href="/institutions" onClick={() => setIsOpen(false)}>Помочь</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;