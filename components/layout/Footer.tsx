/* FILE: components/layout/Footer.tsx */
'use client';

import { HeartHandshake, Send, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1e3a8a] text-white overflow-hidden">
      
      {/* Фоновый узор (еле заметный) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div 
            className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat opacity-5"
            style={{ mixBlendMode: 'soft-light' }} 
         ></div>
      </div>

      {/* Основной контент футера */}
      <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Колонка 1: Лого и Описание */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-2xl font-black text-white group">
              <div className="relative">
                 <div className="relative bg-white text-[#1e3a8a] p-3 rounded-2xl shadow-xl">
                  <HeartHandshake size={28} />
                </div>
              </div>
              <span className="bg-white bg-clip-text text-transparent">Ҳадаф</span>
            </Link>
            
            <p className="text-base text-white/80 leading-relaxed">
              Благотворительная платформа адресной помощи социальным учреждениям Таджикистана.
              Помогаем честно, прозрачно и напрямую.
            </p>

            {/* Социальные сети */}
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
                  className="group relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] transition-all border border-white/20 hover:scale-110 shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 2: О нас */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white/95">О нас</h3>
            <ul className="space-y-3 text-base">
              {[
                { name: 'Миссия и ценности', href: '/about' },
                { name: 'Отчеты и документы', href: '/reports' },
                { name: 'Команда', href: '/team' },
                { name: 'Партнеры', href: '/partners' },
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

          {/* Колонка 3: Как помочь */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white/95">Как помочь</h3>
            <ul className="space-y-3 text-base">
              {[
                { name: 'Хочу помочь вещами', href: '/institutions' },
                { name: 'Найти на карте', href: '/map' },
                { name: 'Стать волонтером', href: '/volunteers' },
                { name: 'Вход для учреждений', href: '/login' },
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

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white/95">Контакты</h3>
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <MapPin size={18} />
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <div className="font-bold text-white mb-1">Адрес офиса</div>
                  <span>Душанбе, Таджикистан<br/>пр. Рудаки, 100</span>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:info@hadaf.tj" className="font-bold text-white hover:text-[#ffca63] transition-colors">
                    info@hadaf.tj
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                   <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">Телефон</div>
                  <a href="tel:+992901643003" className="font-black text-white hover:text-[#ffca63] transition-colors">
                     +992 901643003
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоса (Copyright) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm font-medium mb-2">
                © {new Date().getFullYear()} Проект "Ҳадаф". Все права защищены.
              </p>
              <p className="text-white/40 text-xs">
                Создано с <Heart size={12} className="inline text-red-400 animate-pulse"/> к Таджикистану
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">Политика</a>
              <span className="text-white/20">•</span>
              <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">Оферта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;