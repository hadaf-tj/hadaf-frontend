'use client';

import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { ArrowRight, Heart, Users, Baby, ShieldCheck, Sparkles, TrendingUp, Award, Mountain, Bold } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import OrnamentDivider from '@/components/ui/OrnamentDivider';

// Мок-данные
const MOCK_INSTITUTIONS: Institution[] = [
  { id: '1', name: 'Дом-интернат "Навруз"', city: 'Душанбе', address: '', type: 'Children', contactPhone: '', contactEmail: '', needsCount: 42, lastUpdated: '', needs: [] },
  { id: '2', name: 'Дом престарелых "Отрада"', city: 'Худжанд', address: '', type: 'Elderly', contactPhone: '', contactEmail: '', needsCount: 18, lastUpdated: '', needs: [] },
  { id: '3', name: 'Центр "Умед"', city: 'Вахдат', address: '', type: 'Disabled', contactPhone: '', contactEmail: '', needsCount: 5, lastUpdated: '', needs: [] },
];

const DIRECTIONS = [
  { icon: <Baby size={32} />, title: 'Помощь детям', desc: 'Поддержка детских домов и интернатов необходимыми вещами и продуктами.' },
  { icon: <Users size={32} />, title: 'Пожилые люди', desc: 'Забота о домах престарелых, организация досуга и бытовая помощь.' },
  { icon: <ShieldCheck size={32} />, title: 'Люди с ОВЗ', desc: 'Помощь специализированным центрам и адресная поддержка.' },
];

const HomePage: React.FC = () => {
  return (
    <MainLayout>
    <div className="font-sans overflow-hidden">
      {/* 1. HERO SECTION */}
        <section className="relative w-full h-[600px] lg:h-[700px]">
          <Image 
             src="/hero.png"
             alt="Hero Banner"
             fill
             priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
          {/* ИЗМЕНЕНИЕ: max-w-[1440px] и агрессивные отступы xl:px-28, чтобы сжать контент к центру */}
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-700">
              
              {/* ЗАГОЛОВОК */}
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
                Ҳадаф<br />
                От сердца к сердцу
              </h1>
              
              {/* ПОДЗАГОЛОВОК */}
              <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                Платформа адресной помощи, чтобы ваша помощь мгновенно находила тех, кому она нужнее всего.
              </p>

              {/* КНОПКА */}
              <div className="pt-4">
                <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white hover:text-[#1e3a8a] font-bold h-14 px-10 rounded-full shadow-xl transition-all">
                  <Link href="/institutions">Хочу помочь</Link>
                </Button>
              </div>

            </div>
          </div>
        </div>
        </section>

      {/* 2. КАРТОЧКА МИССИИ */}
        {/* ИЗМЕНЕНИЕ: Те же отступы для контейнера */}
        <section className="container py-7 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-37 relative z-10">
           <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-gray-100">
               <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
                  Наша миссия — прозрачная и адресная помощь
               </h2>
               
               {/* Статистика */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div>
                    <div className="text-5xl font-black text-[#1e3a8a] mb-2">1004</div>
                    <p className="text-gray-800 font-medium">Закрытых нужд</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[#1e3a8a] mb-2">121</div>
                    <p className="text-gray-800 font-medium">Человек получили помощь</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[#1e3a8a] mb-2">21</div>
                    <p className="text-gray-800 font-medium">Учреждение в базе</p>
                  </div>
               </div>
           </div>
        </section>

      {/* 2. СЕКЦИЯ "КОМУ ПОМОГАЕМ" */}
      <section className="py-7 relative">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#1e3a8a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffca63]/10 rounded-full blur-3xl"></div>

        {/* ИЗМЕНЕНИЕ: Те же отступы для контейнера */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black text-gray-800 mb-6">
              <span className="text-[#1e3a8a]">Кому помогаем</span>
            </h2>
            <p className="text-xl text-gray-800 leading-relaxed">
              В нашем реестре только проверенные государственные учреждения. 
              Выберите любое и узнайте их реальные нужды прямо сейчас.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {MOCK_INSTITUTIONS.map((inst, idx) => (
              <div key={inst.id} className="transform hover:scale-105 transition-all duration-300" style={{animationDelay: `${idx * 100}ms`}}>
                <InstitutionCard institution={inst} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-[#1e3a8a] text-white font-bold h-14 px-8 rounded-full hover:shadow-2xl transition-all group">
              <Link href="/institutions" className="flex items-center gap-3">
                Смотреть все учреждения
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* 3. НАПРАВЛЕНИЯ */}
      <OrnamentDivider opacity="opacity-16" height="h-62" />
      <section className="py-7 relative overflow-hidden -mt-54 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzc2M2Y5NyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

        {/* ИЗМЕНЕНИЕ: Те же отступы для контейнера */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black text-gray-800 mb-6">
              <span className="bg-[#1e3a8a] bg-clip-text text-transparent">Наши направления</span>
            </h2>
            <p className="text-xl font-black text-gray-800">
              Мы работаем по трем ключевым направлениям помощи
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTIONS.map((dir, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#1e3a8a]/30 overflow-hidden"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg)',
                  transition: 'all 0.5s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
                }}
              >
                <div className="absolute inset-0 bg-gradient[#1e3a8a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-[#1e3a8a] rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#1e3a8a]/30">
                    {dir.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#1e3a8a] transition-colors">{dir.title}</h3>
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg">{dir.desc}</p>
                  <div className="flex items-center text-[#1e3a8a] font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Узнать больше
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. CTA БЛОК */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-28 relative z-10">
          <div className="relative bg-[#1e3a8a] rounded-3xl p-8 md:p-16 overflow-hidden shadow-2xl">
            
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              
              {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border border-white/10">
                  <Sparkles size={16} className="text-[#ffca63]"/>
                  Станьте организатором
                </div>
                
                {/* НОВЫЙ ЗАГОЛОВОК */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                  Создавайте события и <br className="hidden lg:block"/>
                  <span className="text-[#ffca63]">собирайте команду</span>
                </h2>
                
                {/* НОВЫЙ ТЕКСТ, объясняющий механику */}
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Хотите провести гончарный мастер-класс, викторину или субботник в конкретном детском доме? Создайте событие на платформе! Другие волонтеры увидят вашу инициативу и смогут присоединиться, нажав кнопку «Я иду». Вместе мы можем больше.
                </p>
                
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-black h-14 px-10 rounded-full hover:scale-105 transition-all group text-lg w-full sm:w-auto">
                    {/* Ссылку можно поменять на страницу создания события, например /events/create */}
                    <Link href="/about" className="flex items-center justify-center gap-3">
                      Узнать, как создать событие
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* ПРАВАЯ ЧАСТЬ: ФОТОГРАФИЯ */}
              <div className="flex-1 relative w-full max-w-sm lg:max-w-md">
                {/* Контейнер "стеклянный куб" */}
                <div className="relative w-full aspect-square bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-colors duration-500">
                  {/* Градиентный фон внутри куба */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ffca63]/20 via-transparent to-transparent z-0"></div>
                  
                  {/* ВНУТРЕННИЙ КОНТЕЙНЕР ДЛЯ ФОТО */}
                  {/* Мы делаем его чуть меньше (w-[85%]), чтобы сохранить красивые рамки "стекла" вокруг фото */}
                  <div className="relative w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-10 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/master_klass.png" // Убедитесь, что файл есть в папке public
                      alt="Волонтеры проводят мастер-класс с детьми"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    </MainLayout>
  );
};

export default HomePage;