'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  HeartHandshake, 
  PieChart, 
  Calendar,
  ChevronDown
} from 'lucide-react';

// Мок-данные для графиков и отчетов
const EXPENSES_DATA = [
  { label: 'Продукты питания', percent: 45, color: 'bg-blue-500' },
  { label: 'Медикаменты', percent: 25, color: 'bg-[#ffca63]' },
  { label: 'Одежда и обувь', percent: 15, color: 'bg-green-500' },
  { label: 'Логистика', percent: 10, color: 'bg-purple-500' },
  { label: 'Админ. расходы', percent: 5, color: 'bg-gray-300' },
];

const MONTHLY_REPORTS = [
  { id: 1, month: 'Декабрь 2024', total: '142,000 с.', transactions: 154, status: 'Проверен' },
  { id: 2, month: 'Ноябрь 2024', total: '98,500 с.', transactions: 89, status: 'Проверен' },
  { id: 3, month: 'Октябрь 2024', total: '112,200 с.', transactions: 112, status: 'Проверен' },
  { id: 4, month: 'Сентябрь 2024', total: '87,000 с.', transactions: 76, status: 'Проверен' },
];

export default function ReportsPage() {
  const [year, setYear] = useState('2024');

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        
        {/* 1. HERO HEADER (Синий, как в Login/Institutions) */}
        <div className="bg-[#1e3a8a] pb-24 pt-32 relative overflow-hidden rounded-b-[3rem]">
          {/* Орнамент фоном (очень деликатно) */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
             <div className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat mix-blend-overlay"></div>
          </div>

          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 text-center md:text-left">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-[#ffca63] rounded-full text-sm font-bold border border-white/10 mb-4">
                    <PieChart size={16} />
                    Финансовая прозрачность
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Отчеты и показатели
                  </h1>
                  <p className="text-white/80 text-lg max-w-2xl">
                    Мы публикуем отчеты о каждом потраченном сомони. Доверие — наш главный капитал.
                  </p>
                </div>
                
                {/* Фильтр года */}
                <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
                   {['2024', '2023'].map((y) => (
                     <button 
                       key={y}
                       onClick={() => setYear(y)}
                       className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${year === y ? 'bg-white text-[#1e3a8a] shadow-sm' : 'text-white/70 hover:text-white'}`}
                     >
                       {y}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* 2. DASHBOARD CARDS (Наезжают на синий фон -mt-16) */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-20 -mt-16">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Собрано средств', value: '1,240,500 c.', icon: <TrendingUp />, change: '+12% к ноябрю', color: 'text-green-600' },
                { label: 'Помощь получили', value: '3,402 чел.', icon: <Users />, change: '42 учреждения', color: 'text-[#1e3a8a]' },
                { label: 'Закрыто сборов', value: '856', icon: <HeartHandshake />, change: '98% успешность', color: 'text-[#ffca63]' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between h-48 hover:-translate-y-1 transition-transform duration-300">
                   <div className="flex justify-between items-start">
                      <div className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
                      <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>{stat.icon}</div>
                   </div>
                   <div>
                      <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm font-bold text-gray-400">{stat.change}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 3. MAIN CONTENT: Графики и Список */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 py-12 md:py-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* ЛЕВАЯ ЧАСТЬ: Структура расходов (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-black text-[#1e3a8a] mb-6">Куда уходят деньги?</h3>
                    
                    {/* Визуализация баров */}
                    <div className="space-y-6">
                       {EXPENSES_DATA.map((item, idx) => (
                         <div key={idx}>
                            <div className="flex justify-between text-sm font-bold mb-2">
                               <span className="text-gray-700">{item.label}</span>
                               <span className="text-gray-900">{item.percent}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full rounded-full ${item.color}`} 
                                 style={{ width: `${item.percent}%` }}
                               ></div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                       <p className="text-sm text-gray-500 leading-relaxed">
                          * Мы удерживаем всего 5% на административные расходы (серверы, связь, проверки), что ниже среднего показателя по рынку (10-15%).
                       </p>
                    </div>
                 </div>

                 {/* Карточка "Стать партнером" */}
                 <div className="bg-[#ffca63] p-8 rounded-3xl relative overflow-hidden text-[#1e3a8a]">
                    <div className="relative z-10">
                       <h3 className="text-xl font-black mb-3">Юридическим лицам</h3>
                       <p className="font-medium mb-6 opacity-90">
                          Нужны официальные акты и договоры пожертвования? Мы предоставляем полный пакет документов для бухгалтерии.
                       </p>
                       <Button className="bg-white text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white font-bold h-12 rounded-xl w-full border-0">
                          Скачать реквизиты
                       </Button>
                    </div>
                    {/* Декор */}
                    <div className="absolute -bottom-10 -right-10 opacity-20">
                       <FileText size={150} />
                    </div>
                 </div>
              </div>

              {/* ПРАВАЯ ЧАСТЬ: Список отчетов (7 cols) */}
              <div className="lg:col-span-7">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-gray-900">Ежемесячные отчеты</h3>
                    <Button variant="ghost" className="text-[#1e3a8a] font-bold hover:bg-blue-50">
                       Архив 2023 <ChevronDown size={16} className="ml-1"/>
                    </Button>
                 </div>

                 <div className="space-y-4">
                    {MONTHLY_REPORTS.map((report) => (
                      <div key={report.id} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#1e3a8a] hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                         
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                               <Calendar size={24} />
                            </div>
                            <div>
                               <div className="text-xl font-black text-gray-900">{report.month}</div>
                               <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                  <span>{report.transactions} транзакций</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                  <span className="text-green-600 flex items-center gap-1">
                                    <CheckCircle2 size={12}/> {report.status}
                                  </span>
                               </div>
                            </div>
                         </div>

                         <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                               <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Оборот</div>
                               <div className="text-lg font-black text-[#1e3a8a]">{report.total}</div>
                            </div>
                            <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl border-2 border-gray-100 text-gray-400 hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
                               <Download size={20} />
                            </Button>
                         </div>

                      </div>
                    ))}
                 </div>
                 
                 {/* Кнопка загрузить еще */}
                 <div className="mt-8 text-center">
                    <Button variant="outline" className="border-2 border-dashed border-gray-300 text-gray-400 hover:border-[#1e3a8a] hover:text-[#1e3a8a] font-bold h-14 w-full rounded-2xl">
                       Загрузить ранние отчеты
                    </Button>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </MainLayout>
  );
}

// Вспомогательный компонент иконки (если нужно)
function CheckCircle2({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}