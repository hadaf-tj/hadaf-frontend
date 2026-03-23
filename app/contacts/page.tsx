/* FILE: app/contacts/page.tsx */
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // В будущем: отправка на бэкенд
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

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

              {/* Карточки контактов */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                       <Phone size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Телефон / Telegram</h3>
                    <a href="tel:+992901643003" className="text-[#1e3a8a] font-black text-xl hover:underline">+992 901 643 003</a>
                 </div>

                 <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                       <Mail size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:info@hadaf.tj" className="text-[#1e3a8a] font-black text-xl hover:underline">info@hadaf.tj</a>
                 </div>
              </div>

              {/* Форма обратной связи */}
              <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-xl border border-gray-100 mt-8">
                 <h3 className="text-2xl font-black text-[#1e3a8a] mb-6 text-center">Напишите нам</h3>

                 {submitted && (
                   <div className="mb-6 flex items-center gap-2 px-4 py-4 bg-green-50 text-green-700 rounded-xl text-sm font-bold">
                     <CheckCircle2 size={20} />
                     Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                   </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <input type="text" name="name" placeholder="Ваше Имя" required className="w-full h-14 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                       <input type="tel" name="phone" placeholder=""+992 XX XXX XX XX"" className="w-full h-14 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                    </div>
                    <textarea name="message" placeholder="Ваше сообщение, идея или вопрос..." rows={5} required className="w-full p-5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium resize-none"></textarea>
                    <Button type="submit" className="w-full h-14 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white text-lg font-bold rounded-xl shadow-lg shadow-[#1e3a8a]/20 mt-2">
                       <Send size={20} className="mr-2" />
                       Отправить сообщение
                    </Button>
                 </form>
              </div>
              
           </div>
        </div>

      </div>
    </MainLayout>
  );
}