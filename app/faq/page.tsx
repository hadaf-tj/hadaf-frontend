'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const FAQ_ITEMS = [
  { q: 'Как работает платформа?', a: 'Вы выбираете учреждение из проверенного реестра, видите конкретные нужды (продукты, вещи, лекарства) и нажимаете «Я привезу». Учреждение получает уведомление и ждёт вашу помощь.' },
  { q: 'Можно ли помогать анонимно?', a: 'Да, вы можете помогать без регистрации. Однако аккаунт позволяет отслеживать историю помощи и получать благодарности от учреждений.' },
  { q: 'Как попасть в реестр учреждений?', a: 'Государственные учреждения (детские дома и дома престарелых) могут подать заявку через раздел «Контакты». Мы проверяем документы и добавляем учреждение в реестр.' },
  { q: 'Кто проверяет учреждения?', a: 'Команда Ҳадаф верифицирует каждое учреждение: проверяет регистрационные документы, связывается с администрацией и при необходимости проводит выездную проверку.' },
  { q: 'Куда ушла моя помощь?', a: 'В личном кабинете вы видите статус каждого обещания. После доставки учреждение подтверждает получение, и вы получаете уведомление.' },
];

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <MainLayout>
      <div className="bg-[#1e3a8a] pt-32 pb-16 md:pb-20 rounded-b-[2rem] md:rounded-b-[3rem] relative overflow-hidden shadow-xl mb-12">
        <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-repeat bg-[length:300px] opacity-[0.1] mix-blend-overlay"></div>
        <div className="container mx-auto max-w-4xl px-5 sm:px-6 relative z-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/20 shadow-lg">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6">
            Часто задаваемые вопросы
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ответы на самые популярные вопросы о работе платформы адресной помощи «Ҳадаф».
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl px-5 sm:px-6 pb-20 lg:pb-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#1e3a8a] font-bold hover:translate-x-[-4px] transition-transform mb-8 bg-[#1e3a8a]/5 px-4 py-2 rounded-xl">
          <ArrowLeft size={18} />
          На главную
        </Link>
        
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white shadow-lg shadow-[#1e3a8a]/5 border-[#1e3a8a]/20' 
                    : 'bg-white/60 border-gray-200 hover:bg-white hover:border-[#1e3a8a]/30'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 md:p-8 flex items-center justify-between gap-6"
                >
                  <span className="flex items-start sm:items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e3a8a]/5 text-[#1e3a8a] flex items-center justify-center font-black text-lg sm:text-xl">
                      ?
                    </span>
                    <span className="font-bold text-lg sm:text-xl text-[#1e3a8a] mt-0.5 sm:mt-0 leading-tight">
                      {item.q}
                    </span>
                  </span>
                  <ChevronDown 
                    size={24} 
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1e3a8a]' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0 flex">
                      <div className="w-8 sm:w-10 mr-4 flex-shrink-0 hidden sm:block"></div>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-5 w-full">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}