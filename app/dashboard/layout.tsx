'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  HeartHandshake, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Building2,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProfile } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

// Меню для ВОЛОНТЕРА
const VOLUNTEER_MENU = [
  { name: 'Обзор', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Мои обещания', href: '/dashboard/promises', icon: HeartHandshake },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings },
];

// Меню для СОТРУДНИКА
const INSTITUTION_MENU = [
  { name: 'Обзор', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Управление нуждами', href: '/dashboard/institution', icon: Building2 },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const [user, setUser] = useState<{ full_name: string; role: string; email: string; phone?: string; institution_id?: number } | null>(null);

  // Load collapse state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setSidebarCollapsed(true);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
        try {
            const userData = await getProfile();
            setUser(userData);
        } catch (e) {
            console.error("Не удалось загрузить профиль", e);
        }
    };
    loadUser();
  }, []);

  const toggleCollapse = () => {
    const next = !isSidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  const handleLogout = () => {
      logout();
  };

  const menuItems = user?.role === 'employee' ? INSTITUTION_MENU : VOLUNTEER_MENU;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 bg-[#1e3a8a] text-white transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-white/10 transition-all duration-300",
          isSidebarCollapsed ? "px-4 justify-center" : "px-5"
        )}>
           <Link href="/" className="flex items-center gap-3 font-black text-lg tracking-tight hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-white text-[#1e3a8a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                 <HeartHandshake size={18} />
              </div>
              {!isSidebarCollapsed && <span className="whitespace-nowrap">Ҳадаф</span>}
           </Link>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 py-3", isSidebarCollapsed ? "px-2" : "px-3")}>
          <div className="space-y-1">
           {menuItems.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 title={isSidebarCollapsed ? item.name : undefined}
                 className={cn(
                   "flex items-center gap-3 rounded-xl transition-all font-semibold text-sm group relative",
                   isSidebarCollapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5",
                   isActive 
                     ? "bg-white text-[#1e3a8a] shadow-lg" 
                     : "text-white/70 hover:bg-white/10 hover:text-white"
                 )}
               >
                 <item.icon size={20} className="flex-shrink-0" />
                 {!isSidebarCollapsed && item.name}
                 {/* Tooltip for collapsed state */}
                 {isSidebarCollapsed && (
                   <div className="absolute left-full ml-2 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                     {item.name}
                   </div>
                 )}
               </Link>
             );
           })}
          </div>
        </nav>

        {/* Collapse toggle + Logout */}
        <div className={cn("border-t border-white/10 py-2", isSidebarCollapsed ? "px-2" : "px-3")}>
          <button 
            onClick={handleLogout}
            title={isSidebarCollapsed ? 'Выйти' : undefined}
            className={cn(
              "flex items-center gap-3 w-full text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all font-semibold text-sm",
              isSidebarCollapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5"
            )}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && 'Выйти'}
          </button>

          <button 
            onClick={toggleCollapse}
            className={cn(
              "flex items-center gap-3 w-full text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm mt-1",
              isSidebarCollapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5"
            )}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!isSidebarCollapsed && <span className="text-xs">Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#1e3a8a] text-white transition-transform duration-300 ease-in-out lg:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-14 flex items-center px-5 border-b border-white/10">
           <Link href="/" className="flex items-center gap-3 font-black text-lg" onClick={() => setMobileSidebarOpen(false)}>
              <div className="w-8 h-8 bg-white text-[#1e3a8a] rounded-lg flex items-center justify-center">
                 <HeartHandshake size={16} />
              </div>
              Ҳадаф
           </Link>
        </div>
        <nav className="p-3 space-y-1">
           {menuItems.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 onClick={() => setMobileSidebarOpen(false)}
                 className={cn(
                   "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm",
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
        <div className="absolute bottom-0 left-0 w-full p-3 border-t border-white/10">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 px-3 py-2.5 w-full text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all font-semibold text-sm"
           >
              <LogOut size={20} />
              Выйти
           </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isSidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-64"
      )}>
        {/* Top bar */}
        <header className="h-14 sm:h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm">
           <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-[#1e3a8a] -ml-1">
              <Menu size={22} />
           </button>

           <h2 className="hidden lg:block text-lg font-bold text-gray-800">
             Личный кабинет
           </h2>

           <div className="flex items-center gap-3 ml-auto">
              <button className="relative text-gray-400 hover:text-[#1e3a8a] transition-colors p-1.5 rounded-lg hover:bg-gray-50">
                 <Bell size={20} />
              </button>
              
              <div className="h-6 w-px bg-gray-200 mx-1"></div>
              
              <Link href="/dashboard/settings" className="flex items-center gap-2.5">
                 <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-gray-900 leading-tight">
                        {user ? user.full_name : '...'}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium capitalize">
                        {user ? (user.role === 'employee' ? 'Сотрудник' : 'Волонтер') : ''}
                    </div>
                 </div>
                 <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#3b5cb8] flex items-center justify-center text-white shadow-sm">
                    <User size={16} />
                 </div>
              </Link>
           </div>
        </header>

        <main className="flex-1 p-4 sm:p-5 lg:p-8 pb-20 lg:pb-8 overflow-y-auto">
           {children}
        </main>
      </div>

      {/* ===== MOBILE BOTTOM TAB BAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-stretch">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors",
                  isActive 
                    ? "text-[#1e3a8a]" 
                    : "text-gray-400"
                )}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-bold">{item.name}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1e3a8a] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}