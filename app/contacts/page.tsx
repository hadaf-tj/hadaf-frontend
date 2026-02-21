/* FILE: app/contacts/page.tsx */
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#1e3a8a]">
      
      {/* 1. ХЕДЕР С ЦВЕТНЫМ ВАРИАНТОМ (СИНИЙ ТЕКСТ) */}
      <Header variant="colored" />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
           
           <div className="text-center md:text-left mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-[#1e3a8a] mb-4">Свяжитесь с нами</h1>
              <p className="text-gray-500 text-xl font-medium max-w-2xl">
                 Мы всегда рады ответить на ваши вопросы, предложения и идеи.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* ЛЕВАЯ ЧАСТЬ: Информация */}
              <div className="space-y-8">
                 {/* Карточки контактов */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-100">
                       <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                          <Phone size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900 mb-1">Телефон</h3>
                       <p className="text-[#1e3a8a] font-black text-lg">+992 900 00 00 00</p>
                       <p className="text-sm text-gray-400 mt-1">Пн-Пт, 9:00 - 18:00</p>
                    </div>

                    <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-100">
                       <div className="w-10 h-10 bg-blue-100 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4">
                          <Mail size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                       <p className="text-[#1e3a8a] font-black text-lg">hello@hadaf.tj</p>
                       <p className="text-sm text-gray-400 mt-1">Отвечаем в течение суток</p>
                    </div>
                 </div>

                 <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-100 flex items-start gap-4">
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
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <h3 className="text-xl font-black text-[#1e3a8a] mb-6">Напишите нам</h3>
                    <form className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Имя" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                          <input type="text" placeholder="Телефон" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                       </div>
                       <textarea placeholder="Ваше сообщение..." rows={4} className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium resize-none"></textarea>
                       <Button className="w-full h-12 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold rounded-xl shadow-lg shadow-[#1e3a8a]/20">
                          <Send size={18} className="mr-2" />
                          Отправить сообщение
                       </Button>
                    </form>
                 </div>
              </div>

              {/* ПРАВАЯ ЧАСТЬ: Карта */}
              <div className="h-full min-h-[400px] rounded-[2.5rem] overflow-hidden relative shadow-xl border border-gray-200">
                 {/* Заглушка карты, в реальности тут iframe Google Maps */}
                 <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
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
      </main>

      <Footer />
    </div>
  );
}