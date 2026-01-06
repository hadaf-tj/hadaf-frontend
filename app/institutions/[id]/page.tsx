'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Users, 
  Clock, 
  ChevronLeft, 
  Share2, 
  AlertCircle,
  Gift
} from 'lucide-react';
import PledgeModal, { NeedItem } from '@/components/specific/PledgeModal';

// Мок-данные для одного учреждения
const INSTITUTION_DATA = {
  id: '1',
  name: 'Дом-интернат "Навруз"',
  type: 'Children',
  city: 'Душанбе',
  address: 'ул. Сомони 45, район Исмоили Сомони',
  director: 'Каримова Мадина',
  phone: '+992 900 12 34 56',
  email: 'navruz@payvand.tj',
  description: 'Государственное учреждение для детей-сирот и детей, оставшихся без попечения родителей. В настоящее время у нас проживают 124 ребенка в возрасте от 3 до 16 лет. Мы стараемся создать для них семейную атмосферу и дать достойное образование.',
  verified: true,
  stats: {
    children: 124,
    staff: 32,
    closedNeeds: 456
  },
  needs: [
    { id: 1, title: 'Зимняя обувь (35-40 размер)', category: 'Одежда', total: 20, collected: 12, urgent: true },
    { id: 2, title: 'Мука 1 сорта (мешки по 50кг)', category: 'Продукты', total: 10, collected: 2, urgent: true },
    { id: 3, title: 'Тетради в клетку (48 листов)', category: 'Канцелярия', total: 200, collected: 200, urgent: false }, // Закрытый сбор
    { id: 4, title: 'Стиральный порошок (автомат)', category: 'Бытовая химия', total: 15, collected: 5, urgent: false },
    { id: 5, title: 'Мячи футбольные', category: 'Спорт', total: 5, collected: 0, urgent: false },
  ]
};

export default function InstitutionDetailPage() {
  const params = useParams(); // В реальном проекте используем params.id для fetch
  const data = INSTITUTION_DATA;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<NeedItem | null>(null);

  // Хендлер для открытия
  const handlePledgeClick = (need: any) => {
    setSelectedNeed(need);
    setIsModalOpen(true);
  };

  // Простейший прогресс-бар
  const ProgressBar = ({ current, total }: { current: number, total: number }) => {
    const percent = Math.min(100, Math.round((current / total) * 100));
    const isCompleted = current >= total;
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs font-bold mb-1">
          <span className={isCompleted ? 'text-green-600' : 'text-[#1e3a8a]'}>
            {isCompleted ? 'Сбор закрыт' : `Собрано: ${current} из ${total}`}
          </span>
          <span className="text-gray-400">{percent}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-[#ffca63]'}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        
        {/* 1. HEADER IMAGE & BREADCRUMBS */}
        <div className="relative h-[300px] lg:h-[350px] w-full bg-[#1e3a8a]">
           {/* Фото учреждения на фоне */}
           <Image 
             src="/hero_institution_id.png" // В реальности - фото конкретного дома
             alt={data.name}
             fill
             className="object-cover opacity-40 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
           
           <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 h-full flex flex-col justify-between py-32">
              {/* Хлебные крошки */}
              <Link href="/institutions" className="inline-flex items-center text-white/80 hover:text-white transition-colors font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                <ChevronLeft size={16} className="mr-1"/>
                Назад к списку
              </Link>
           </div>
        </div>

        {/* 2. MAIN CONTENT (Карточка учреждения "вирит" в воздухе -mt-32) */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-32 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ЛЕВАЯ КОЛОНКА (Основная инфо) - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
               {/* Карточка профиля */}
               <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center">
                       <Users size={32} />
                    </div>
                    {data.verified && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        Проверено
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
                    {data.name}
                  </h1>
                  
                  <div className="flex items-center text-gray-500 font-medium mb-6">
                     <MapPin size={16} className="mr-2 text-[#ffca63]" />
                     {data.city}, {data.address}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <div className="text-2xl font-black text-[#1e3a8a]">{data.stats.children}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Подопечных</div>
                     </div>
                     <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <div className="text-2xl font-black text-[#1e3a8a]">{data.stats.staff}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Персонал</div>
                     </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-100">
                     <div className="flex items-center gap-3">
                        <Phone size={18} className="text-gray-400" />
                        <div>
                           <p className="text-xs text-gray-400 font-bold uppercase">Контакты</p>
                           <p className="font-bold text-gray-800">{data.phone}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <Users size={18} className="text-gray-400" />
                        <div>
                           <p className="text-xs text-gray-400 font-bold uppercase">Директор</p>
                           <p className="font-bold text-gray-800">{data.director}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Кнопка "Поделиться" */}
               <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-transparent">
                  <Share2 size={18} className="mr-2" />
                  Поделиться профилем
               </Button>
            </div>

            {/* ПРАВАЯ КОЛОНКА (Нужды и описание) - 8 cols */}
            <div className="lg:col-span-8 space-y-8">
               
               {/* Описание */}
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 mb-4">О нас</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {data.description}
                  </p>
               </div>

               {/* Список нужд (Wishlist) */}
               <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1e3a8a]">
                      Актуальные нужды
                    </h2>
                    <span className="bg-[#ffca63] text-[#1e3a8a] px-3 py-1 rounded-lg text-sm font-bold">
                       {data.needs.filter(n => n.collected < n.total).length} открыто
                    </span>
                  </div>

                  <div className="space-y-4">
                     {data.needs.map((need) => {
                       const isDone = need.collected >= need.total;
                       
                       return (
                         <div 
                           key={need.id} 
                           className={`bg-white rounded-2xl p-6 transition-all border ${isDone ? 'border-green-100 opacity-60' : 'border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1'}`}
                         >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                               {/* Иконка категории */}
                               <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-[#1e3a8a]'}`}>
                                  {isDone ? <CheckCircle2 size={24}/> : <Gift size={24}/>}
                               </div>

                               {/* Инфо */}
                               <div className="flex-1 w-full">
                                  <div className="flex justify-between items-start mb-2">
                                     <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{need.category}</span>
                                          {need.urgent && !isDone && (
                                            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Срочно</span>
                                          )}
                                        </div>
                                        <h4 className={`text-xl font-bold ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                           {need.title}
                                        </h4>
                                     </div>
                                  </div>
                                  
                                  {/* Прогресс */}
                                  <div className="max-w-md">
                                     <ProgressBar current={need.collected} total={need.total} />
                                  </div>
                               </div>

                               {/* Кнопка действия */}
                               {!isDone && (
                                 <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                    <Button 
                                    onClick={() => handlePledgeClick(need)}
                                    className="w-full bg-[#1e3a8a] hover:bg-[#2c4db5] text-white font-bold h-12 rounded-xl px-6">
                                       Я привезу
                                    </Button>
                                 </div>
                               )}
                            </div>
                         </div>
                       );
                     })}
                  </div>
                  
                  {/* Алерт */}
                  <div className="mt-8 bg-[#fff8e6] border border-[#ffca63]/30 rounded-2xl p-6 flex gap-4 items-start">
                     <AlertCircle className="text-[#e6b046] flex-shrink-0 mt-1" size={24} />
                     <div>
                        <h4 className="font-bold text-[#966d1f] mb-1">Важно знать</h4>
                        <p className="text-[#b38632] text-sm leading-relaxed">
                           Пожалуйста, перед поездкой нажмите кнопку «Я привезу», чтобы забронировать нужное количество. Это поможет избежать дублирования помощи.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
          </div>
        </div>

      </div>
      {selectedNeed && (
         <PledgeModal 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
           need={selectedNeed} 
           institutionName={data.name}
         />
       )}
    </MainLayout>
  );
}