/* FILE: app/dashboard/layout.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ListPlus, 
  Building, 
  LogOut, 
  ArrowLeft,
  Menu, // Гамбургер
  X     // Крестик
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
    }
    router.push('/');
  };

  // Компонент навигации (чтобы не дублировать код для мобилки и десктопа)
  const NavContent = () => {
      const baseLinkClass = 'flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-600 transition-all duration-200 font-medium';
      const hoverClass = 'hover:bg-[#f7f9fe] hover:text-[#763f97] hover:pl-5'; 
      const activeClass = 'bg-[#763f97] text-white shadow-md shadow-[#763f97]/20 font-bold'; 

      return (
        <div className="flex flex-col h-full">
            <div className="mb-10 px-2 flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 text-[#763f97] hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 bg-[#763f97] rounded-lg flex items-center justify-center text-white">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-extrabold text-xl tracking-tight">На сайт</span>
                </Link>
            </div>

            <nav className="flex flex-col space-y-2 flex-1">
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={cn(baseLinkClass, pathname === '/dashboard' ? activeClass : hoverClass)}>
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Обзор</span>
                </Link>
                <Link href="/dashboard/needs" onClick={() => setIsMobileMenuOpen(false)} className={cn(baseLinkClass, pathname.startsWith('/dashboard/needs') ? activeClass : hoverClass)}>
                    <ListPlus className="h-5 w-5" />
                    <span>Управление нуждами</span>
                </Link>
                <Link href="/dashboard/institution" onClick={() => setIsMobileMenuOpen(false)} className={cn(baseLinkClass, pathname.startsWith('/dashboard/institution') ? activeClass : hoverClass)}>
                    <Building className="h-5 w-5" />
                    <span>Мое учреждение</span>
                </Link>
            </nav>

            <div className="pt-6 border-t border-gray-100 mt-auto">
                <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Выйти</span>
                </button>
            </div>
        </div>
      );
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fe]">
      
      {/* 1. SIDEBAR (Только Десктоп) */}
      <aside className="hidden md:flex w-72 flex-col bg-white p-6 shadow-2xl shadow-gray-200/50 rounded-r-[2.5rem] z-20 sticky top-0 h-screen">
         <NavContent />
      </aside>

      {/* 2. MOBILE HEADER (Только Мобильные) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-30 shadow-sm">
          <span className="font-bold text-[#763f97] text-lg">Кабинет</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
             {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* 3. MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-20 pt-20 px-6 pb-6 md:hidden animate-in slide-in-from-top-10">
              <NavContent />
          </div>
      )}

      {/* 4. ОСНОВНОЙ КОНТЕНТ */}
      <div className="flex-1 p-4 pt-20 md:p-10 md:pt-10 lg:p-12 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}