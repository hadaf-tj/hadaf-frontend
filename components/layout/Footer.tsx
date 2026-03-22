'use client';

import { HeartHandshake, Send, Phone, Mail, MapPin, ArrowRight, Heart, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1e3a8a] text-white overflow-hidden">
      {/* Анимированный фон (можно добавить svg или градиенты, если нужно) */}

      <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-repeat bg-[length:300px] opacity-[0.1] pointer-events-none mix-blend-overlay"></div>

      {/* Основной контент футера */}
      {/* ИЗМЕНЕНИЕ: Те же настройки контейнера для вертикального ритма */}
      <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-10 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">

          <div className="space-y-6 sm:space-y-8 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 text-2xl font-black text-white group">
              <div className="relative">
                <div className="relative bg-white text-[#1e3a8a] p-3 rounded-2xl shadow-xl">
                  <HeartHandshake size={28} />
                </div>
              </div>
              <span className="bg-white bg-clip-text text-transparent">Ҳадаф</span>
            </Link>

            <p className="text-base text-white/80 leading-relaxed">
              Благотворительная платформа адресной помощи социальным учреждениям Таджикистана. Помогаем честно, прозрачно и напрямую.
            </p>

            {/* Статистика в футере */}

          </div>

          {/* Колонка 2: Навигация */}
          <div className="lg:col-span-3 lg:col-start-7 lg:pl-8">
            <h3 className="font-black text-lg sm:text-xl mb-4 sm:mb-8 text-white/95">Навигация</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              {[
                { name: 'О нас', href: '/about' },
                { name: 'Учреждения', href: '/institutions' },
                { name: 'События', href: '/events' },
                { name: 'Вакансии', href: '/vacancies' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Контакты', href: '/contacts' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-all flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ffca63]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div className="lg:col-span-3">
            <h3 className="font-black text-lg sm:text-xl mb-4 sm:mb-8 text-white/95">Контакты</h3>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
              <a href="https://t.me/hadaf_tjk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#229ED9]/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#229ED9]/40 transition-all border border-[#229ED9]/30">
                  <Send size={20} className="text-white relative right-0.5" />
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#ffca63] transition-colors">Telegram</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/company/hadaftj/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0a66c2]/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0a66c2]/40 transition-all border border-[#0a66c2]/30">
                  <Linkedin size={20} className="text-white" />
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#ffca63] transition-colors">LinkedIn</span>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4 group cursor-not-allowed opacity-60 p-2 -m-2 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-pink-500/30">
                  <Instagram size={20} className="text-white" />
                </div>
                <div className="text-white/80">
                  <span className="font-bold text-base sm:text-lg text-white">Instagram (Скоро)</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Нижняя полоса - улучшенная */}
        <div className="mt-10 sm:mt-16 md:mt-20 pt-6 sm:pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm font-medium mb-2">
                &copy; {new Date().getFullYear()} Проект "Ҳадаф". Все права защищены.
              </p>
              <p className="text-white/40 text-xs">
                Создано с <Heart size={12} className="inline text-red-400 animate-pulse" /> к Таджикистану
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors font-medium">
                Политика конфиденциальности
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors font-medium">
                Публичная оферта
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/documents" className="text-white/60 hover:text-white transition-colors font-medium">
                Документы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;