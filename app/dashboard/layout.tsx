/* FILE: app/dashboard/layout.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  HeartHandshake, 
  History, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Пункты меню
const MENU_ITEMS = [
  { name: 'Обзор', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Мои обещания', href: '/dashboard/promises', icon: HeartHandshake },
  { name: 'История помощи', href: '/dashboard/history', icon: History },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      
      {/* 1. SIDEBAR (Desktop: Fixed, Mobile: Drawer) */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#1e3a8a] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Логотип в сайдбаре */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
           <div className="flex items-center gap-3 font-black text-xl tracking-tight">
              <div className="w-8 h-8 bg-white text-[#1e3a8a] rounded-lg flex items-center justify-center">
                 <HeartHandshake size={18} />
              </div>
              Пайванд
           </div>
           {/* Кнопка закрытия (Mobile only) */}
           <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/50 hover:text-white">
             <X size={24} />
           </button>
        </div>

        {/* Навигация */}
        <nav className="p-4 space-y-2">
           {MENU_ITEMS.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 onClick={() => setSidebarOpen(false)}
                 className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                   isActive 
                     ? "bg-white text-[#1e3a8a] shadow-lg" 
                     : "text-white/70 hover:bg-white/10 hover:text-white"
                 )}
               >
                 <item.icon size={20} />
                 {item.name}
               </Link>
             );
           })}
        </nav>

        {/* Футер сайдбара */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
           <button className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold text-sm">
              <LogOut size={20} />
              Выйти
           </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header (Дашборд) */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
           
           {/* Бургер (Mobile) */}
           <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-[#1e3a8a]">
              <Menu size={24} />
           </button>

           {/* Заголовок (Desktop) */}
           <h2 className="hidden lg:block text-xl font-black text-gray-800">
             Личный кабинет
           </h2>

           {/* Правая часть (Профиль) */}
           <div className="flex items-center gap-4 ml-auto">
              <button className="relative text-gray-400 hover:text-[#1e3a8a] transition-colors">
                 <Bell size={22} />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
              
              <div className="flex items-center gap-3 pl-2">
                 <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-gray-900">Алишер В.</div>
                    <div className="text-xs text-gray-400 font-medium">Волонтер</div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
                    <User size={20} />
                 </div>
              </div>
           </div>
        </header>

        {/* Контент страницы */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
           {children}
        </main>

      </div>
      
      {/* Overlay для мобилки */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#1e3a8a]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}