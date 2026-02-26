'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь уже согласие
    const consent = localStorage.getItem('hadaf_cookie_consent');
    if (!consent) {
      // Небольшая задержка перед показом для плавности
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('hadaf_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6 max-w-2xl w-full pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
        
        <div className="w-12 h-12 rounded-full bg-[#ffca63]/20 text-[#1e3a8a] flex items-center justify-center shrink-0">
          <Cookie size={24} />
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#1e3a8a] mb-1">Мы используем файлы cookie</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Мы используем cookie исключительно для сохранения сессии при входе в личный кабинет. 
            Продолжая использовать сайт, вы соглашаетесь с нашей <Link href="/privacy" className="text-[#1e3a8a] underline font-medium hover:text-[#ffca63] transition-colors">Политикой конфиденциальности</Link>.
          </p>
        </div>
        
        <div className="flex w-full sm:w-auto shrink-0 gap-3 mt-2 sm:mt-0">
          <Button 
            onClick={acceptCookies}
            className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold h-11 px-6 rounded-xl"
          >
            Понятно
          </Button>
          <button 
            onClick={() => setIsVisible(false)}
            className="w-11 h-11 flex sm:hidden items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="hidden sm:flex absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>
        
      </div>
    </div>
  );
}
