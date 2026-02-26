/* FILE: app/faq/page.tsx */
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDown, HelpCircle, Heart, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Вопросы и ответы
const FAQ_ITEMS = [
  {
    category: 'Общие вопросы',
    items: [
      { q: 'Как работает платформа Ҳадаф?', a: 'Мы напрямую соединяем доноров (волонтеров) с государственными учреждениями. Учреждения публикуют списки нужд, а вы выбираете, что именно хотите купить и привезти. Мы не собираем деньги на свои счета — помощь передается из рук в руки.' },
      { q: 'Берете ли вы комиссию?', a: 'Нет. Платформа полностью бесплатна для волонтеров и учреждений. Проект существует за счет грантов и поддержки партнеров.' },
    ]
  },
  {
    category: 'Для волонтеров',
    items: [
      { q: 'Нужно ли регистрироваться, чтобы помочь?', a: 'Вы можете просматривать список нужд без регистрации. Но чтобы забронировать нужду (нажать "Я привезу"), регистрация необходима. Это нужно, чтобы избежать дублирования помощи.' },
      { q: 'Могу ли я помочь деньгами?', a: 'Мы фокусируемся на вещевой помощи (продукты, одежда, техника). Однако некоторые учреждения могут принимать оплату счетов. Свяжитесь с директором учреждения через контакты в профиле.' },
    ]
  },
  {
    category: 'Для учреждений',
    items: [
      { q: 'Как зарегистрировать учреждение?', a: 'Нажмите кнопку "Регистрация", выберите "Учреждение" и заполните форму. Наш модератор свяжется с вами для проверки документов в течение 24 часов.' },
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
        
        {/* Header */}
        <div className="bg-[#1e3a8a] pt-24 pb-16 rounded-b-[3rem] text-center relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-md text-[#ffca63]">
                 <HelpCircle size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                 Частые вопросы
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                 Все, что вы хотели знать о том, как работает благотворительность по-новому.
              </p>
           </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-6 py-16 relative z-20">
           
           <div className="space-y-8">
              {FAQ_ITEMS.map((section, sIdx) => (
                <div key={sIdx} className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 md:p-10 border border-gray-100">
                   <h2 className="text-2xl font-black text-[#1e3a8a] mb-6 flex items-center gap-3">
                      {sIdx === 0 && <ShieldCheck size={28} className="text-[#ffca63]" />}
                      {sIdx === 1 && <Heart size={28} className="text-[#ffca63]" />}
                      {section.category}
                   </h2>
                   
                   <div className="space-y-4">
                      {section.items.map((item, iIdx) => {
                        const id = `${sIdx}-${iIdx}`;
                        const isOpen = openIndex === id;
                        
                        return (
                          <div key={iIdx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                             <button 
                               onClick={() => toggle(id)}
                               className="w-full flex justify-between items-start text-left py-2 hover:text-[#1e3a8a] transition-colors group"
                             >
                                <span className="font-bold text-lg text-gray-800 group-hover:text-[#1e3a8a] pr-4">
                                   {item.q}
                                </span>
                                <ChevronDown 
                                  className={cn("text-gray-400 transition-transform duration-300 shrink-0 mt-1", isOpen && "rotate-180 text-[#ffca63]")} 
                                />
                             </button>
                             <div 
                               className={cn(
                                 "overflow-hidden transition-all duration-300 ease-in-out text-gray-600 leading-relaxed pr-8",
                                 isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                               )}
                             >
                                {item.a}
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
              ))}
           </div>

           {/* Если нет ответа */}
           <div className="text-center mt-12">
              <p className="text-gray-500 font-medium">Не нашли ответ?</p>
              <a href="mailto:support@hadaf.tj" className="text-[#1e3a8a] font-black hover:underline text-lg">
                 Напишите нам в поддержку
              </a>
           </div>

        </div>
      </div>
    </MainLayout>
  );
}