/* FILE: app/rules/page.tsx */
'use client';

import MainLayout from '@/components/layout/MainLayout';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function RulesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        
        {/* HERO */}
        <div className="bg-[#1e3a8a] pt-24 pb-16 rounded-b-[3rem] text-center">
           <div className="container mx-auto px-6">
              <h1 className="text-4xl font-black text-white mb-4">Правила посещения</h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                 Чтобы помощь приносила только радость, просим соблюдать эти простые правила при визите в учреждения.
              </p>
           </div>
        </div>

        <div className="container mx-auto max-w-5xl px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* ЧТО МОЖНО */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-100">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900">Приветствуется</h2>
              </div>
              <ul className="space-y-4">
                 {[
                   'Заранее согласовывать время визита (через кнопку "Я привезу").',
                   'Привозить вещи в чистом и опрятном виде.',
                   'Иметь при себе документ, удостоверяющий личность.',
                   'Быть вежливыми с персоналом и подопечными.'
                 ].map((rule, i) => (
                   <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 font-medium">{rule}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* ЧТО НЕЛЬЗЯ */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-red-100">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <XCircle size={24} />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900">Запрещено</h2>
              </div>
              <ul className="space-y-4">
                 {[
                   'Приезжать в состоянии алкогольного опьянения.',
                   'Фотографировать детей без разрешения администрации.',
                   'Дарить детям подарки лично в руки (передавайте через воспитателей).',
                   'Привозить скоропортящиеся продукты без сертификатов.',
                   'Обещать детям, что вы их заберете или приедете снова (если не уверены).'
                 ].map((rule, i) => (
                   <li key={i} className="flex items-start gap-3">
                      <XCircle className="text-red-500 shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 font-medium">{rule}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Важно */}
        <div className="container mx-auto max-w-5xl px-6 mt-8">
           <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
              <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
              <div>
                 <h3 className="font-bold text-orange-800 text-lg mb-1">Важно помнить</h3>
                 <p className="text-orange-700/80 leading-relaxed">
                    Администрация учреждения имеет право отказать в посещении при нарушении правил. Помните, что безопасность и спокойствие подопечных — наш главный приоритет.
                 </p>
              </div>
           </div>
        </div>

      </div>
    </MainLayout>
  );
}