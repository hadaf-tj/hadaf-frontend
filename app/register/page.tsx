'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { User, Building2, ArrowLeft, HeartHandshake, Check } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'volunteer' | 'institution'>('volunteer');

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative font-sans">
      
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-gray-400 hover:text-[#1e3a8a] flex items-center gap-2 font-bold transition-colors"
      >
        <ArrowLeft size={20} />
        На главную
      </Link>

      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-900/20">
           <HeartHandshake size={28} />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Создание аккаунта</h1>
      </div>

      <div className="w-full max-w-[500px] bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
        
        {/* Выбор роли (Важный момент для "серьезности") */}
        <div className="grid grid-cols-2 gap-3 mb-8">
            <button 
              onClick={() => setRole('volunteer')}
              className={`relative overflow-hidden rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all ${role === 'volunteer' ? 'border-[#1e3a8a] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
               {role === 'volunteer' && <div className="absolute top-2 right-2 text-[#1e3a8a]"><Check size={16} /></div>}
               <User className={`mb-2 ${role === 'volunteer' ? 'text-[#1e3a8a]' : 'text-gray-400'}`} size={24} />
               <span className={`text-sm font-bold ${role === 'volunteer' ? 'text-[#1e3a8a]' : 'text-gray-600'}`}>Я волонтер</span>
            </button>
            <button 
              onClick={() => setRole('institution')}
              className={`relative overflow-hidden rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all ${role === 'institution' ? 'border-[#1e3a8a] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
               {role === 'institution' && <div className="absolute top-2 right-2 text-[#1e3a8a]"><Check size={16} /></div>}
               <Building2 className={`mb-2 ${role === 'institution' ? 'text-[#1e3a8a]' : 'text-gray-400'}`} size={24} />
               <span className={`text-sm font-bold ${role === 'institution' ? 'text-[#1e3a8a]' : 'text-gray-600'}`}>Учреждение</span>
            </button>
        </div>

        <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Имя</label>
                <input type="text" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Фамилия</label>
                <input type="text" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium" />
              </div>
            </div>

            {/* Дополнительное поле для Учреждений */}
            {role === 'institution' && (
               <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                 <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Официальное название</label>
                 <input type="text" placeholder='Детский дом №1' className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium" />
                 <p className="text-[10px] text-gray-400 ml-1">Мы запросим документы для верификации позже</p>
               </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Email</label>
              <input type="email" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Пароль</label>
              <input type="password" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium" />
            </div>

            <Button className="w-full h-12 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold text-base rounded-xl mt-4 shadow-lg shadow-[#1e3a8a]/20">
              Зарегистрироваться
            </Button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Уже есть аккаунт? <Link href="/login" className="text-[#1e3a8a] font-black hover:underline">Войти</Link>
          </p>
        </div>

      </div>
    </div>
  );
}