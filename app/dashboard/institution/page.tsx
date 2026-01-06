/* FILE: app/dashboard/institution/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Package, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Мок-данные заявок
const MY_NEEDS = [
  { id: 1, title: 'Зимняя обувь (35-40 размер)', category: 'Одежда', total: 20, collected: 12, urgent: true, date: '12.01.2024' },
  { id: 2, title: 'Мука 1 сорта (мешки по 50кг)', category: 'Продукты', total: 10, collected: 10, urgent: true, date: '10.01.2024' }, // Сбор закрыт
  { id: 3, title: 'Мячи футбольные', category: 'Спорт', total: 5, collected: 0, urgent: false, date: '05.01.2024' },
];

export default function InstitutionDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* 1. Хедер + Кнопка действия */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#1e3a8a]">Управление нуждами</h1>
           <p className="text-gray-500 font-medium">
             Публикуйте то, что действительно необходимо вашим подопечным.
           </p>
        </div>
        <Button className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#1e3a8a]/20 flex items-center gap-2">
           <Plus size={20} />
           Добавить нужду
        </Button>
      </div>

      {/* 2. Статистика (Кратко) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">12</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Активных сборов</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
               <Clock size={24} />
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">45</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Получено помощи</div>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
               <Package size={24} />
            </div>
         </div>
         {/* Важное уведомление */}
         <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 flex items-center gap-4">
            <AlertTriangle className="text-yellow-600 shrink-0" size={32} />
            <div>
               <div className="font-bold text-yellow-800 leading-tight mb-1">Подтвердите отчет</div>
               <div className="text-xs text-yellow-700 font-medium leading-tight">
                  По заявке "Тетради" помощь получена. Пожалуйста, загрузите фото.
               </div>
            </div>
         </div>
      </div>

      {/* 3. Таблица/Список заявок */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Наименование</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Прогресс</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Статус</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Действия</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {MY_NEEDS.map((item) => {
                     const percent = Math.round((item.collected / item.total) * 100);
                     const isDone = item.collected >= item.total;
                     
                     return (
                        <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors group">
                           {/* Название */}
                           <td className="py-5 px-6">
                              <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-[#1e3a8a]'}`}>
                                    {isDone ? <CheckCircle2 size={20}/> : <Package size={20}/>}
                                 </div>
                                 <div>
                                    <div className="font-bold text-gray-900">{item.title}</div>
                                    <div className="text-xs text-gray-400 font-medium">
                                       {item.category} • {item.date}
                                    </div>
                                    {item.urgent && !isDone && (
                                       <span className="md:hidden mt-1 inline-block bg-red-100 text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded">СРОЧНО</span>
                                    )}
                                 </div>
                              </div>
                           </td>

                           {/* Прогресс */}
                           <td className="py-5 px-6 w-1/4">
                              <div className="flex justify-between text-xs font-bold mb-1.5">
                                 <span className="text-gray-500">{item.collected} из {item.total}</span>
                                 <span className="text-[#1e3a8a]">{percent}%</span>
                              </div>
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${isDone ? 'bg-green-500' : item.urgent ? 'bg-red-400' : 'bg-[#1e3a8a]'}`} style={{ width: `${percent}%` }}></div>
                              </div>
                           </td>

                           {/* Статус */}
                           <td className="py-5 px-6 text-center">
                              {isDone ? (
                                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase">
                                    <CheckCircle2 size={12} />
                                    Закрыт
                                 </span>
                              ) : item.urgent ? (
                                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase animate-pulse">
                                    Срочно
                                 </span>
                              ) : (
                                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase">
                                    Активен
                                 </span>
                              )}
                           </td>

                           {/* Действия */}
                           <td className="py-5 px-6 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 text-gray-400 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors" title="Редактировать">
                                    <Edit2 size={18} />
                                 </button>
                                 <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                                    <Trash2 size={18} />
                                 </button>
                              </div>
                              {/* Меню для мобилки (всегда видно) */}
                              <button className="md:hidden text-gray-400">
                                 <MoreVertical size={20} />
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         
         {/* Пустой стейт (если нет заявок) */}
         {MY_NEEDS.length === 0 && (
            <div className="p-12 text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Package size={32} />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">У вас пока нет активных заявок</h3>
               <p className="text-gray-500 mb-6">Создайте первую заявку, чтобы волонтеры могли помочь</p>
               <Button variant="outline">Создать заявку</Button>
            </div>
         )}
      </div>

    </div>
  );
}