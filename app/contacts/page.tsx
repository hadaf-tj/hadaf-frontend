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

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-8 sm:py-12 md:py-16">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              
              {/* ЛЕВАЯ ЧАСТЬ: Информация */}
              <div className="space-y-4 sm:space-y-8">
                 {/* Карточки контактов */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                       <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                          <Phone size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900 mb-1">Телефон</h3>
                       <a href="tel:+992901643003" className="text-[#1e3a8a] font-black text-lg hover:underline">+992 901 643 003</a>
                       <p className="text-sm text-gray-400 mt-1">Пн-Пт, 9:00 - 18:00</p>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                       <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                          <Mail size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                       <a href="mailto:info@hadaf.tj" className="text-[#1e3a8a] font-black text-lg hover:underline">info@hadaf.tj</a>
                       <p className="text-sm text-gray-400 mt-1">Отвечаем в течение суток</p>
                    </div>
                 </div>

                 <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center shrink-0">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 mb-1">Главный офис</h3>
                       <p className="text-gray-600 font-medium text-lg leading-relaxed">
                          г. Душанбе, район Исмоили Сомони,<br/> проспект Рудаки 12, офис 404
                       </p>
                    </div>
                 </div>
                 
                 {/* Форма обратной связи */}
                 <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-xl border border-gray-100">
                    <h3 className="text-xl font-black text-[#1e3a8a] mb-6">Напишите нам</h3>

                    {submitted && (
                      <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold">
                        <CheckCircle2 size={18} />
                        Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" name="name" placeholder="Имя" required className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                          <input type="tel" name="phone" placeholder="Телефон" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                       </div>
                       <textarea name="message" placeholder="Ваше сообщение..." rows={4} required className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium resize-none"></textarea>
                       <Button type="submit" className="w-full h-12 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold rounded-xl shadow-lg shadow-[#1e3a8a]/20">
                          <Send size={18} className="mr-2" />
                          Отправить сообщение
                       </Button>
                    </form>
                 </div>
              </div>

              {/* ПРАВАЯ ЧАСТЬ: Карта */}
              <div className="h-full min-h-[300px] sm:min-h-[400px] rounded-2xl sm:rounded-[2.5rem] overflow-hidden relative shadow-xl border border-gray-200">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.3664726282!2d68.7790!3d38.5790!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM0JzQ0LjQiTiA2OMKwNDYnNDQuNCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="grayscale hover:grayscale-0 transition-all duration-500"
                 ></iframe>
              </div>

           </div>
        </div>

      </div>
    </MainLayout>
  );
}