/* FILE: app/dashboard/page.tsx */
import { 
  Heart, 
  PackageCheck, 
  Clock, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
       
       {/* 1. Приветствие */}
       <div>
         <h1 className="text-3xl font-black text-[#1e3a8a]">Здравствуйте, Алишер! 👋</h1>
         <p className="text-gray-500 font-medium mt-1">
           Вот что происходит с вашими добрыми делами сегодня.
         </p>
       </div>

       {/* 2. Статистика (KPI Cards) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                   <PackageCheck size={24} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+2 в этом месяце</span>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">12</div>
             <div className="text-sm text-gray-400 font-bold uppercase">Закрытых нужд</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                   <Clock size={24} />
                </div>
                <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">Требуют внимания</span>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">2</div>
             <div className="text-sm text-gray-400 font-bold uppercase">В процессе</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                   <Heart size={24} />
                </div>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">8,450 c.</div>
             <div className="text-sm text-gray-400 font-bold uppercase">Оценочный вклад</div>
          </div>
       </div>

       {/* 3. Активные задачи (My Promises) */}
       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
             <h3 className="text-lg font-black text-gray-900">Мои обещания</h3>
             <Link href="/dashboard/promises" className="text-sm font-bold text-[#1e3a8a] hover:underline">
               Смотреть все
             </Link>
          </div>
          
          <div className="divide-y divide-gray-50">
             {/* Задача 1 */}
             <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-orange-100 text-orange-600">Детский дом</span>
                      <span className="text-xs text-gray-400 font-medium">Дом-интернат "Навруз"</span>
                   </div>
                   <h4 className="text-base font-bold text-gray-900">Привезти зимнюю обувь (5 пар)</h4>
                   <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <AlertCircle size={14} className="text-orange-500" />
                      <span className="font-medium text-orange-600">Ожидается до 15 января</span>
                   </div>
                </div>
                <button className="px-4 py-2 bg-[#1e3a8a] text-white text-sm font-bold rounded-xl hover:bg-[#2a4ec2] transition-colors whitespace-nowrap">
                   Я выполнил
                </button>
             </div>

             {/* Задача 2 */}
             <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-600">Дом престарелых</span>
                      <span className="text-xs text-gray-400 font-medium">Центр "Отрада"</span>
                   </div>
                   <h4 className="text-base font-bold text-gray-900">Закупить медикаменты (Список №4)</h4>
                   <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>Ожидается до 20 января</span>
                   </div>
                </div>
                <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
                   Подробнее
                </button>
             </div>
          </div>
       </div>

    </div>
  );
}