'use client'; // <-- 1. Make this a Client Component to support onSubmit and interactivity

import { HeartHandshake, Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    // bg-[#763f97] - Основной фиолетовый фон
    // [&_a]:text-white - ПРИНУДИТЕЛЬНО красит все ссылки внутри в белый
    <footer className="bg-[#763f97] text-white mt-20 [&_a]:text-white [&_a:hover]:opacity-80 [&_a]:transition-opacity">
      
      {/* Блок подписки (как на референсе) */}
      <div className="border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-1">Подписаться на новости</h3>
            <p className="text-white/70 text-sm">Узнавайте первыми о новых сборах и отчетах</p>
          </div>
          {/* 2. The form below uses onSubmit, which requires client-side JS */}
          <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 w-full md:w-80 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all"
            />
            <button className="bg-[#ffca63] text-[#763f97] px-6 py-3 rounded-lg font-bold hover:bg-[#ffd685] transition-colors">
              Подписаться
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Колонка 1: О фонде */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold !text-white group">
              <div className="bg-white text-[#763f97] p-2 rounded-full group-hover:scale-110 transition-transform">
                <HeartHandshake size={24} />
              </div>
              <span>Пайванд</span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              Благотворительная платформа адресной помощи социальным учреждениям Таджикистана. Помогаем честно, прозрачно и напрямую.
            </p>
            <div className="flex gap-3">
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Send size={18}/></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><MessageCircle size={18}/></a>
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h3 className="font-bold text-lg mb-6">О фонде</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about">Миссия и ценности</Link></li>
              <li><Link href="/reports">Отчеты и документы</Link></li>
              <li><Link href="/team">Команда</Link></li>
              <li><Link href="/partners">Партнеры</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Помощь */}
          <div>
            <h3 className="font-bold text-lg mb-6">Как помочь</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/institutions">Хочу помочь вещами</Link></li>
              <li><Link href="/map">Найти на карте</Link></li>
              <li><Link href="/volunteers">Стать волонтером</Link></li>
              <li><Link href="/login">Вход для учреждений</Link></li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="font-bold text-lg mb-6">Контакты</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0"/>
                <span>Душанбе, Таджикистан,<br/>пр. Рудаки, 100</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:info@payvand.tj" className="font-semibold">info@payvand.tj</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+992000000000" className="font-bold text-lg">+992 00 000 00 00</a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Проект "Пайванд". Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Публичная оферта</a>
            <span className="opacity-50">Разработано волонтерами</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;