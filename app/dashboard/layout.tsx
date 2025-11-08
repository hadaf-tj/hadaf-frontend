'use client'; // 1. Делаем компонент клиентским

import Link from 'next/link';
import {
  LayoutDashboard,
  ListPlus,
  Building,
  LogOut,
} from 'lucide-react';
import { usePathname } from 'next/navigation'; // 2. Импортируем хук
import { cn } from '@/lib/utils'; // 2. Импортируем утилиту для классов

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 3. Получаем текущий путь

  const baseLinkClass = 'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors';
  const hoverClass = 'hover:bg-[#763f97]/10 hover:text-[#763f97]'; // Легкий фиолетовый фон при наведении
  const activeClass = 'bg-[#763f97]/10 text-[#763f97] font-semibold'; // Активный стиль

  return (
    <div className="flex min-h-screen bg-[#f7f9fe]"> {/* Используем ваш фон */}
      {/* Сайдбар */}
      <aside className="hidden w-64 flex-col bg-white p-4 shadow-lg md:flex">
        <div className="mb-8 text-center">
          <Link href="/dashboard" className="text-2xl font-bold text-[#763f97]">
            Панель
          </Link>
        </div>
        <nav className="flex flex-col space-y-2">
          
          {/* 4. Применяем условные классы */}
          <Link
            href="/dashboard"
            className={cn(
              baseLinkClass,
              hoverClass,
              pathname === '/dashboard' && activeClass // Активен только если ТОЧНО /dashboard
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Обзор</span>
          </Link>
          
          <Link
            href="/dashboard/needs"
            className={cn(
              baseLinkClass,
              hoverClass,
              pathname.startsWith('/dashboard/needs') && activeClass // Активен, если URL начинается с /dashboard/needs
            )}
          >
            <ListPlus className="h-5 w-5" />
            <span>Управление нуждами</span>
          </Link>
          
          <Link
            href="/dashboard/institution"
            className={cn(
              baseLinkClass,
              hoverClass,
              pathname.startsWith('/dashboard/institution') && activeClass // Активен, если URL начинается с /dashboard/institution
            )}
          >
            <Building className="h-5 w-5" />
            <span>Мое учреждение</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            <span>Выйти</span>
          </Link>
        </div>
      </aside>

      {/* Основной контент */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}