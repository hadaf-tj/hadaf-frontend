/* FILE: app/team/page.tsx */
'use client';

import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { Linkedin, Mail, Send } from 'lucide-react';

const TEAM = [
   { id: 1, name: 'Алишер Садиков', role: 'Основатель', img: '/team/1.jpg', telegram: '@alisher_sadikov' },
   { id: 2, name: 'Мадина Каримова', role: 'Координатор волонтеров', img: '/team/2.jpg', telegram: '@madina_karimova' },
   { id: 3, name: 'Фарход Джураев', role: 'Менеджер по работе с партнерами', img: '/team/3.jpg', telegram: '@farhod_juraev' },
   { id: 4, name: 'Зарина Исмоилова', role: 'Юрист', img: '/team/4.jpg', telegram: '@zarina_ismoilova' },
   // Добавьте больше людей
];

export default function TeamPage() {
   return (
      <MainLayout>
         <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">

            {/* HERO SECTION */}
            <div className="bg-[#1e3a8a] pt-32 pb-20 rounded-b-[3rem] text-center relative overflow-hidden">
               <div className="absolute inset-0 pointer-events-none opacity-10">
                  <div className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat mix-blend-overlay"></div>
               </div>
               <div className="container mx-auto px-6 relative z-10">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                     Наша команда
                  </h1>
                  <p className="text-white/80 text-lg max-w-2xl mx-auto">
                     Люди, которые каждый день работают над тем, чтобы помощь доходила до адресатов.
                  </p>
               </div>
            </div>

            {/* TEAM GRID */}
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-12 relative z-20">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TEAM.map((member) => (
                     <div key={member.id} className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                        {/* Фото (Заглушка, если нет фото) */}
                        <div className="aspect-square rounded-2xl bg-gray-100 mb-4 relative overflow-hidden">
                           {/* <Image src={member.img} fill alt={member.name} className="object-cover" /> */}
                           <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl font-black">
                              {member.name[0]}
                           </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">{member.name}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-4">{member.role}</p>

                        <div className="flex gap-2">
                           <a href={`https://t.me/${member.telegram?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-colors">
                              <Send size={16} />
                           </a>
                           <button className="w-8 h-8 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-colors">
                              <Linkedin size={16} />
                           </button>
                           <button className="w-8 h-8 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-colors">
                              <Mail size={16} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </MainLayout>
   );
}