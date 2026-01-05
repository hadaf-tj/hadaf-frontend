'use client';

import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { ArrowRight, Heart, Users, Baby, ShieldCheck, Lightbulb, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

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
      
      {/* 1. HERO SECTION - Максимально современный и живой */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 mx-4 mt-4">
        {/* Градиентный фон с анимированными элементами */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#763f97] via-[#9d5cb5] to-[#5a2d7a] rounded-[3rem] overflow-hidden">
          {/* Анимированные круги */}
          {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffca63] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#ffca63] rounded-full blur-[150px] opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div> */}
          
          {/* Сетка для глубины */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0tMiAwdi0ySDMydjJoMnptLTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTItMnYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Текстовая часть */}
            <div className="lg:col-span-7 space-y-10">
              {/* Бейдж с иконкой */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/15 backdrop-blur-xl rounded-full text-sm font-bold tracking-wider border border-white/20 shadow-lg hover:bg-white/20 transition-all group cursor-pointer">
                <Sparkles size={18} className="text-[#ffca63] animate-pulse"/>
                <span className="text-white">Платформа адресной помощи</span>
              </div>

              {/* Заголовок с градиентом */}
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="text-white block mb-2">Благотворительность</span>
                <span className="bg-gradient-to-r from-[#ffca63] via-[#ffd685] to-[#ffca63] bg-clip-text text-transparent">
                  без посредников
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl font-light">
                Прямая и прозрачная помощь людям в социальных учреждениях Таджикистана. Каждое доброе дело имеет значение.
              </p>

              {/* Статистика с эффектом стекла */}
              <div className="grid grid-cols-3 gap-6 py-10 px-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="text-center transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#ffca63] to-[#ffa726] bg-clip-text text-transparent mb-2">1088+</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-widest font-bold">Закрытых нужд</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform cursor-pointer border-x border-white/20">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">29.3К</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-widest font-bold">Получили помощь</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">271</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-widest font-bold">Учреждений</div>
                </div>
              </div>

              {/* CTA кнопки */}
              <div className="flex flex-wrap gap-5 pt-4">
                <Button asChild size="lg" className="bg-[#ffca63] text-[#763f97] hover:bg-[#ffd685] font-black h-16 px-10 rounded-2xl text-lg hover:scale-105 transition-all duration-300 group">
                  <Link href="/institutions" className="flex items-center gap-3">
                    <Heart size={22} className="group-hover:animate-pulse"/>
                    Хочу помочь
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white hover:bg-white hover:text-[#763f97] font-bold h-16 px-10 rounded-2xl text-lg hover:scale-105 transition-all duration-300">
                  <Link href="/about">Узнать больше</Link>
                </Button>
              </div>
            </div>

            {/* Правая часть: Изображение с эффектами */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full max-w-[550px] mx-auto">
                {/* Основное фото */}
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white/20 shadow-2xl backdrop-blur-xl transform hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffca63]/30 to-transparent z-10"></div>
                  <Image 
                    src="http://googleusercontent.com/image_generation_content/3" 
                    alt="Дети и волонтеры" 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                {/* Floating карточка "История месяца" */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl max-w-xs transform hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-pointer group" style={{rotate: '3deg'}}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#763f97] to-[#9d5cb5] flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={24}/>
                    </div>
                    <div>
                      <p className="text-[#763f97] font-black text-lg mb-1">История месяца</p>
                      <p className="text-gray-600 text-sm leading-snug">Как волонтеры починили крышу в доме престарелых</p>
                    </div>
                  </div>
                  <Link href="#" className="text-[#763f97] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Читать историю
                    <ArrowRight size={16} className="text-[#ffca63]"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. СЕКЦИЯ "КОМУ ПОМОГАЕМ" - с живыми карточками */}
      <section className="py-28 bg-gradient-to-b from-white to-[#f7f9fe] relative">
        {/* Декоративные элементы */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#763f97]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffca63]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-[#763f97]/10 text-[#763f97] rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Проверенные учреждения
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Кому мы <span className="text-[#763f97]">помогаем</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              В нашем реестре только проверенные государственные учреждения. 
              Выберите любое и увидьте их реальные нужды прямо сейчас.
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
            <Button asChild size="lg" className="bg-gradient-to-r from-[#763f97] to-[#9d5cb5] text-white hover:from-[#9d5cb5] hover:to-[#763f97] font-bold h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all group">
              <Link href="/institutions" className="flex items-center gap-3">
                Смотреть все учреждения
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. НАПРАВЛЕНИЯ - 3D эффект карточек */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzc2M2Y5NyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Наши <span className="bg-gradient-to-r from-[#763f97] to-[#9d5cb5] bg-clip-text text-transparent">направления</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы работаем по трем ключевым направлениям помощи
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTIONS.map((dir, idx) => (
              <div 
                key={idx} 
                className="group relative bg-gradient-to-br from-white to-[#f7f9fe] rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#763f97]/30 overflow-hidden"
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
                {/* Градиентный блик */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#763f97]/5 via-transparent to-[#ffca63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#763f97] to-[#9d5cb5] rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#763f97]/30">
                    {dir.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#763f97] transition-colors">{dir.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">{dir.desc}</p>
                  <div className="flex items-center text-[#763f97] font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Узнать больше
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA БЛОК - Максимально эффектный */}
      <section className="py-28 bg-gradient-to-b from-[#f7f9fe] to-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="relative bg-gradient-to-br from-[#763f97] via-[#8b4fa8] to-[#763f97] rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden">
            {/* Анимированный фон */}
            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-xl text-white rounded-full text-sm font-bold uppercase tracking-wider">
                  <Sparkles size={16} className="text-[#ffca63]"/>
                  Волонтерам
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Создайте своё<br/>
                  <span className="text-[#ffca63]">«Событие со смыслом»</span>
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Любой праздник можно сделать благотворительным. Предложите друзьям вместо подарков сделать пожертвование. Это просто и вдохновляюще!
                </p>
                <Button asChild size="lg" className="bg-[#ffca63] text-[#763f97] hover:bg-white font-black h-16 px-10 rounded-2xl shadow-2xl hover:shadow-[#ffca63]/50 hover:scale-105 transition-all group">
                  <Link href="/about" className="flex items-center gap-3">
                    Узнать как это работает
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </Button>
              </div>
              
              <div className="flex-1 relative w-full max-w-md">
                <div className="relative w-full aspect-[4/3] bg-white/10 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 flex items-center justify-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffca63]/20 to-transparent"></div>
                  <Lightbulb size={120} className="text-[#ffca63] drop-shadow-2xl group-hover:scale-110 transition-transform animate-pulse" />
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