import Link from 'next/link';
import {
  LayoutDashboard,
  ListPlus,
  Settings,
  Building,
  LogOut,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Сайдбар */}
      <aside className="hidden w-64 flex-col bg-white p-4 shadow-lg md:flex">
        <div className="mb-8 text-center">
          <Link href="/dashboard" className="text-2xl font-bold text-[#763f97]">
            Панель
          </Link>
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-[#763f97]50 hover:text-[#763f97]">
            <LayoutDashboard className="h-5 w-5" />
            <span>Обзор</span>
          </Link>
          <Link href="/dashboard/needs" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-[#763f97]">
            <ListPlus className="h-5 w-5" />
            <span>Управление нуждами</span>
          </Link>
          <Link href="/dashboard/institution" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-[#763f97]">
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