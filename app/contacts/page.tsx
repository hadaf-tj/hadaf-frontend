/* FILE: app/contacts/page.tsx */
'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Send, MessageCircle } from 'lucide-react';

export default function ContactsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen font-sans bg-[#f8fafc]">

        {/* HERO HEADER */}
        <div className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-10 sm:pb-16 rounded-b-[2rem] sm:rounded-b-[3rem] text-center relative overflow-hidden">
           <div className="container mx-auto px-5 sm:px-6 relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">Свяжитесь с нами</h1>
              <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
                 Мы всегда рады ответить на ваши вопросы, предложения и идеи.
              </p>
           </div>
        </div>

        <div className="container mx-auto max-w-3xl px-5 sm:px-6 py-12 sm:py-16">
           <div className="space-y-8">
              
              {/* Объяснение об онлайн-формате */}
              <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
                 <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Мы работаем полностью онлайн</h3>
                 <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    На этапе Beta-тестирования платформы у проекта «Ҳадаф» нет физического офиса или складов для приёма вещей. 
                    Платформа призвана напрямую связывать волонтеров с учреждениями. 
                    По всем вопросам сотрудничества и технической поддержки пишите нам онлайн — мы на связи!
                 </p>
              </div>

              {/* Telegram карточка */}
              <a href="https://t.me/hadaf_tjk" target="_blank" rel="noopener noreferrer" className="block outline-none pt-4">
                <div className="bg-gradient-to-r from-[#229ED9] to-[#1E88E5] p-8 sm:p-12 rounded-2xl sm:rounded-[2.5rem] shadow-xl text-center transform hover:scale-[1.02] transition-transform duration-300">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <MessageCircle size={40} className="text-white fill-white" />
                   </div>
                   <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">Наш Telegram-канал</h3>
                   <p className="text-white/90 font-medium text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">Главный источник новостей и прямая связь с командой волонтеров проекта.</p>
                   <div className="inline-flex items-center gap-3 bg-white text-[#229ED9] px-8 py-4 rounded-xl font-black text-lg hover:bg-gray-50 transition-colors shadow-lg">
                     <Send size={24} className="mr-1 relative right-0.5" />
                     Подписаться в Telegram
                   </div>
                </div>
              </a>

           </div>
        </div>

      </div>
    </MainLayout>
  );
}