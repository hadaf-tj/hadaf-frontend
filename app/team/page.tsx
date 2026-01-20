/* FILE: app/team/page.tsx */
'use client';

import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { Linkedin, Mail, User } from 'lucide-react';
import Link from 'next/link';

// В массиве 10 человек. Заполни данные для первых трех, остальные — заглушки.
const TEAM = [
  // 1. ТЫ (Данные, которые ты дал)
  { 
    id: 1, 
    name: 'Сиёвуш Хамидов', 
    role: 'Founder', // Укажи точную роль
    email: 'siyovush.hamidov.1729@gmail.com', 
    linkedin: '', // Вставь ссылку на LinkedIn, если есть
    img: '' // Если фото нет, будет показана первая буква имени
  },
  // 2. Член команды (Данные есть)
  { 
    id: 2, 
    name: 'Аличон Тошев', 
    role: 'Разработчик', 
    email: 'alijon07_t@mail.ru', 
    linkedin: 'linkedin.com/in/alijon-toshev-48085b3a4', 
    img: '' 
  },
  // 3. Член команды (Данные есть)
  { 
    id: 3, 
    name: 'Шукурзода Саидмехроч', 
    role: 'Chief Technology Officer', 
    email: 'email@example.com', 
    linkedin: 'https://www.linkedin.com/in/shukurzodasaidmehroj', 
    img: '' 
  },
  // 4-10. Заглушки для остальных (Данных пока нет)
  { id: 4, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
  { id: 5, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
  { id: 6, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
  { id: 7, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
  { id: 8, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
  { id: 9, name: 'Husein_A', 
   role: 'Full Stack Developer', 
   email: 'abdulloevhm2030@gmail.com', 
   linkedin: 'https://www.linkedin.com/in/husein-abdulloev-4466b83a7', 
   img: '' },
  { id: 10, name: 'Член команды', role: 'Сотрудник', email: '', linkedin: '', img: '' },
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
                <div key={member.id} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center">
                   
                   {/* Аватарка или Заглушка */}
                   <div className="w-32 h-32 rounded-full bg-blue-50 mb-4 relative overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                      {member.img ? (
                          <Image src={member.img} fill alt={member.name} className="object-cover" />
                      ) : (
                          <span className="text-4xl font-black text-[#1e3a8a] opacity-50">
                            {member.name ? member.name[0] : <User />}
                          </span>
                      )}
                   </div>
                   
                   <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">{member.name}</h3>
                   <p className="text-sm text-gray-500 font-medium mb-4">{member.role}</p>
                   
                   {/* Соцсети */}
                   <div className="flex gap-3 mt-auto">
                      {member.linkedin && (
                        <Link href={member.linkedin} target="_blank" className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                           <Linkedin size={20} />
                        </Link>
                      )}
                      
                      {member.email && (
                        <Link href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300">
                           <Mail size={20} />
                        </Link>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </MainLayout>
  );
}