'use client';

import { HeartHandshake, Send, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Симуляция отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Спасибо за подписку!');
    }, 1000);
  };

  return (
    <footer className="relative bg-[#1e3a8a] text-white overflow-hidden">
      {/* Анимированный фон (можно добавить svg или градиенты, если нужно) */}

      <div className="absolute inset-0 z-0 pointer-events-none">
         <div 
            className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat opacity-5"
            // Используем opacity-10 или даже opacity-5, чтобы было еле заметно.
            // На темном синем фоне желто-синий узор будет выглядеть интересно.
            // Можно попробовать mix-blend-soft-light или mix-blend-overlay для разных эффектов.
            style={{ mixBlendMode: 'soft-light' }} 
         ></div>
      </div>

      {/* Блок подписки - премиум дизайн */}
      <div className="relative z-10 border-b border-white/10">
        {/* ИЗМЕНЕНИЕ: max-w-[1440px] и отступы xl:px-28 для выравнивания с контентом страницы */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 py-16">
          <div className="bg-white/10 rounded-[2.5rem] p-10 md:p-16 border border-white/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffca63]/20 backdrop-blur-xl rounded-full text-sm font-bold mb-4">
                  <Heart size={16} className="text-[#ffca63]"/>
                  <span>Будьте в курсе</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                  Подписаться на <span className="text-[#ffca63]">новости</span>
                </h3>
                <p className="text-white/80 text-lg">
                  Узнавайте первыми о новых сборах, отчетах и историях помощи
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 lg:min-w-[500px]">
                <div className="relative flex-1">
                  <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50"/>
                  <input 
                    type="email" 
                    placeholder="Введите ваш email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all font-medium shadow-lg"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#ffca63] text-[#1e3a8a] px-8 py-4 rounded-2xl font-black hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap group"
                >
                  {isSubmitting ? 'Отправка...' : (
                    <span className="flex items-center gap-2">
                      Подписаться
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент футера */}
      {/* ИЗМЕНЕНИЕ: Те же настройки контейнера для вертикального ритма */}
      <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          <div className="space-y-8 lg:col-span-1">
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

            {/* Социальные сети - стильные иконки */}
            <div className="flex gap-3">
              {[
                { icon: <Send size={20}/>, href: '#', label: 'Telegram' },
                { icon: <MessageCircle size={20}/>, href: '#', label: 'WhatsApp' },
                { icon: <Facebook size={20}/>, href: '#', label: 'Facebook' },
                { icon: <Instagram size={20}/>, href: '#', label: 'Instagram' },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  aria-label={social.label}
                  className="group relative w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] transition-all border border-white/20 hover:scale-110 hover:rotate-6 shadow-lg"
                >
                  <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Статистика в футере */}
           
          </div>

          <div>
            <h3 className="font-black text-xl mb-8 text-white/95">О нас</h3>
            <ul className="space-y-4 text-base">
              {[
                { name: 'Миссия и ценности', href: '/about' },
                { name: 'Отчеты и документы', href: '/reports' },
                { name: 'Команда', href: '/team' },
                { name: 'Партнеры', href: '/partners' },
                { name: 'Пресс-центр', href: '/press' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-white/70 hover:text-white transition-all flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ffca63]"/>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Помощь */}
          <div>
            <h3 className="font-black text-xl mb-8 text-white/95">Как помочь</h3>
            <ul className="space-y-4 text-base">
              {[
                { name: 'Хочу помочь вещами', href: '/institutions' },
                { name: 'Найти на карте', href: '/map' },
                { name: 'Стать волонтером', href: '/volunteers' },
                { name: 'Вход для учреждений', href: '/login' },
                { name: 'Создать событие', href: '/events' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-white/70 hover:text-white transition-all flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ffca63]"/>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 4: Контакты - выделенная */}
          <div>
            <h3 className="font-black text-xl mb-8 text-white/95">Контакты</h3>
            <div className="space-y-6 text-base">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all border border-white/20">
                  <MapPin size={20} />
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <div className="font-bold text-white mb-1">Адрес офиса</div>
                  <span>Душанбе, Таджикистан<br/>пр. Рудаки, 100</span>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all border border-white/20">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:info@hadaf.tj" className="font-bold text-white hover:text-[#ffca63] transition-colors">
                    info@hadaf.tj
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all border border-white/20">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">Телефон</div>
                  <a href="tel:+992000000000" className="font-black text-white hover:text-[#ffca63] transition-colors">
                    +992 901643003
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоса - улучшенная */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm font-medium mb-2">
                &copy; {new Date().getFullYear()} Проект "Ҳадаф". Все права защищены.
              </p>
              <p className="text-white/40 text-xs">
                Создано с <Heart size={12} className="inline text-red-400 animate-pulse"/> к Таджикистану
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">
                Политика конфиденциальности
              </a>
              <span className="text-white/20">•</span>
              <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">
                Публичная оферта
              </a>
              <span className="text-white/20">•</span>
              <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">
                Документы
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;