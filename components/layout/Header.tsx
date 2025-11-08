'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation'; // <-- 1. Импортируем useRouter

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 2. Добавляем состояние для проверки "вошел ли пользователь"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 3. Эффект для проверки localStorage при загрузке
  useEffect(() => {
    // Эта проверка симулирует, что мы "помним" пользователя
    // Когда у вас будет реальная аутентификация, вы замените это
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Эффект для отслеживания прокрутки (ваш код)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Функция для "Выхода"
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Очищаем симуляцию
    setIsLoggedIn(false);
    setIsOpen(false); // Закрываем мобильное меню, если оно открыто
    router.push('/'); // Возвращаем на главную
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-[1000] transition-all duration-300', // z-index 1000, не 10000
        isScrolled ? 'bg-white shadow-sm' : 'bg-[#763f97] shadow-lg'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Логотип (без изменений) */}
        <Link href="/" className="text-2xl font-extrabold flex items-center gap-2 transition-colors">
          <HeartHandshake className={cn(isScrolled ? 'text-[#763f97]' : 'text-white')} />
          <span className={cn(isScrolled ? 'text-gray-900' : 'text-white')}>Пайванд</span>
        </Link>

        {/* Навигация для десктопа (с изменениями) */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/institutions" className={cn('font-semibold transition-colors', isScrolled ? 'text-gray-700 hover:text-[#763f97]' : 'text-white hover:opacity-80')}>
            Учреждения
          </Link>
          <Link href="/map" className={cn('font-semibold transition-colors', isScrolled ? 'text-gray-700 hover:text-[#763f97]' : 'text-white hover:opacity-80')}>
            Карта
          </Link>

          {/* 5. ГЛАВНОЕ ИЗМЕНЕНИЕ: Условные кнопки */}
          {isLoggedIn ? (
            // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВОШЕЛ ---
            <>
              <Link href="/dashboard" className={cn('font-semibold transition-colors', isScrolled ? 'text-gray-700 hover:text-[#763f97]' : 'text-white hover:opacity-80')}>
                Панель
              </Link>
              <button
                onClick={handleLogout}
                className={cn(
                  'px-5 py-2 rounded-lg text-sm font-bold shadow transition-colors',
                  isScrolled
                    ? 'bg-[#763f97] text-white hover:bg-[#763f97]/90'
                    : 'bg-white text-[#763f97] hover:bg-gray-100'
                )}
              >
                Выйти
              </button>
            </>
          ) : (
            // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ ГОСТЬ ---
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
          )}
        </nav>

        {/* Кнопка Гамбургер (без изменений) */}
        <button
          className={cn('md:hidden p-2 rounded-lg transition-colors focus:outline-none', isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Мобильная панель (с изменениями) */}
      {isOpen && (
        <nav
          className={cn(
            "md:hidden absolute w-full shadow-lg",
            isScrolled ? 'bg-white' : 'bg-[#763f97]'
          )}
        >
          <Link
            href="/institutions"
            className={cn(
              'block p-4 border-t font-semibold transition-colors',
              isScrolled ? 'text-gray-700 border-gray-100 hover:bg-gray-50' : 'text-white border-white/10 hover:bg-white/5'
            )}
            onClick={() => setIsOpen(false)}
          >
            Учреждения
          </Link>
          <Link
            href="/map"
            className={cn(
              'block p-4 border-t font-semibold transition-colors',
              isScrolled ? 'text-gray-700 border-gray-100 hover:bg-gray-50' : 'text-white border-white/10 hover:bg-white/5'
            )}
            onClick={() => setIsOpen(false)}
          >
            Карта
          </Link>

          {/* 6. ГЛАВНОЕ ИЗМЕНЕНИЕ (МОБИЛЬНАЯ ВЕРСИЯ): Условные кнопки */}
          {isLoggedIn ? (
            // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВОШЕЛ (МОБ) ---
            <>
              <Link
                href="/dashboard"
                className={cn(
                  'block p-4 border-t font-semibold transition-colors',
                  isScrolled ? 'text-gray-700 border-gray-100 hover:bg-gray-50' : 'text-white border-white/10 hover:bg-white/5'
                )}
                onClick={() => setIsOpen(false)}
              >
                Панель
              </Link>
              <button
                onClick={handleLogout}
                className={cn(
                  'block p-4 border-t font-bold transition-colors w-full text-left', // w-full и text-left важны для вида кнопки
                  isScrolled 
                    ? 'text-[#763f97] border-gray-100 bg-gray-50' 
                    : 'text-[#763f97] bg-white/90 border-white/10'
                )}
              >
                Выйти
              </button>
            </>
          ) : (
            // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ ГОСТЬ (МОБ) ---
            <Link
              href="/login"
              className={cn(
                'block p-4 border-t font-bold transition-colors',
                isScrolled 
                  ? 'text-[#763f97] border-gray-100 bg-gray-50' 
                  : 'text-[#763f97] bg-white/90 border-white/10'
              )}
              onClick={() => setIsOpen(false)}
            >
              Вход для сотрудников
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;