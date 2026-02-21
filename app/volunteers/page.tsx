/* FILE: app/volunteers/page.tsx */
'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { UserPlus, Search, Gift, ArrowRight } from 'lucide-react';

export default function VolunteersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        
        {/* HERO */}
        <div className="bg-[#1e3a8a] pt-32 pb-24 rounded-b-[3rem] text-center relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                 Станьте частью добра
              </h1>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
                 Волонтеры — это сердце нашего проекта. Узнайте, как просто начать помогать.
              </p>
              <Button asChild className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd685] font-black text-lg h-14 px-8 rounded-2xl border-0 shadow-lg">
                 <Link href="/register">Стать волонтером</Link>
              </Button>
           </div>
        </div>

        {/* STEPS */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-16 relative z-20">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: UserPlus, title: '1. Регистрация', text: 'Создайте аккаунт волонтера. Это займет всего 2 минуты.' },
                { icon: Search, title: '2. Выбор нужды', text: 'Найдите на карте или в списке то, что вы можете привезти.' },
                { icon: Gift, title: '3. Поездка', text: 'Забронируйте нужду и отвезите помощь лично в руки.' },
              ].map((step, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
                   <div className="w-14 h-14 bg-[#1e3a8a] text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-blue-900/20">
                      <step.icon size={28} />
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 mb-3 relative z-10">{step.title}</h3>
                   <p className="text-gray-500 font-medium leading-relaxed relative z-10">{step.text}</p>
                </div>
              ))}
           </div>
        </div>

        {/* FAQ Preview */}
        <div className="container mx-auto max-w-4xl mt-20 text-center">
           <h2 className="text-3xl font-black text-[#1e3a8a] mb-6">Остались вопросы?</h2>
           <p className="text-gray-600 mb-8">
              Почитайте наш раздел с частыми вопросами, там много полезного.
           </p>
           <Button asChild variant="outline" className="h-12 border-2 px-8 rounded-xl font-bold">
              <Link href="/faq">Перейти в FAQ <ArrowRight size={18} className="ml-2"/></Link>
           </Button>
        </div>

      </div>
    </MainLayout>
  );
}