import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { ArrowRight, Heart, Users, Baby, ShieldCheck, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="font-sans">
      
      {/* 1. HERO SECTION (Стиль Хабенского) */}
      {/* ИСПРАВЛЕНО: rounded-[3rem] (со всех сторон) и mt-4 (отступ от хедера) */}
      <section className="relative bg-[#763f97] text-white pt-12 pb-20 lg:pb-32 rounded-[3rem] overflow-hidden shadow-xl mx-4 mt-4">
        
        {/* Декор фона */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Текстовая часть */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold tracking-wider uppercase mb-4 border border-white/10">
                 Платформа адресной помощи
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Благотворительность <br/>
                <span className="text-[#ffca63]">без посредников</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl font-medium">
                Наша миссия — повышение качества жизни людей в социальных учреждениях Таджикистана через прозрачную и прямую помощь.
              </p>

              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-white/10">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#ffca63] mb-1">1 088+</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-semibold">Закрытых нужд</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">29 312</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-semibold">Человек получили помощь</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">271</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-semibold">Учреждение в базе</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#ffca63] text-[#763f97] hover:bg-[#ffca63]/90 font-bold h-14 px-8 rounded-full text-lg shadow-lg hover:-translate-y-1 transition-transform">
                  <Link href="/institutions">Хочу помочь</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#763f97] font-bold h-14 px-8 rounded-full text-lg">
                  <Link href="/about">Подробнее о нас</Link>
                </Button>
              </div>
            </div>

            {/* Правая часть: Изображение */}
            <div className="lg:col-span-5 relative hidden lg:block">
               <div className="relative w-[500px] h-[500px] mx-auto">
                  {/* Основное фото в круге */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full border-[8px] border-white/10 overflow-hidden shadow-2xl">
                    <Image 
                      src="http://googleusercontent.com/image_generation_content/3" 
                      alt="Дети и волонтеры" 
                      fill 
                      className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Плашка "Истории" */}
                  <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-3xl shadow-xl max-w-xs transform rotate-3 animate-in fade-in slide-in-from-bottom-10 duration-1000 hover:rotate-0 transition-transform">
                    <p className="text-[#763f97] font-bold text-lg mb-1">История месяца</p>
                    <p className="text-gray-600 text-sm leading-snug">Как волонтеры починили крышу в доме престарелых за 2 дня.</p>
                    <Link href="#" className="text-[#ffca63] font-bold text-sm mt-3 inline-flex items-center hover:gap-2 transition-all">Читать <ArrowRight size={16} className="ml-1"/></Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. СЕКЦИЯ "КОМУ ПОМОГАЕМ" */}
      <section className="py-24 bg-[#f7f9fe]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#763f97] mb-4">Кому мы помогаем</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                В нашем реестре только проверенные государственные учреждения. <br/>Вы можете выбрать любое и увидеть их реальные нужды.
              </p>
            </div>
            <Link href="/institutions" className="hidden md:flex items-center font-bold text-[#763f97] hover:opacity-80 transition-colors group">
              Посмотреть всех <span className="ml-2 bg-[#763f97] text-white rounded-full p-1 group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_INSTITUTIONS.map((inst) => (
              <InstitutionCard key={inst.id} institution={inst} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Button asChild variant="outline" className="w-full border-[#763f97] text-[#763f97] h-12 font-bold rounded-full">
                <Link href="/institutions">Посмотреть всех</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* 3. НАПРАВЛЕНИЯ (Карточки с иконками) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 text-center">Наши направления</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTIONS.map((dir, idx) => (
              <div key={idx} className="group bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-[#763f97]/30 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 bg-[#f7f9fe] rounded-2xl flex items-center justify-center text-[#763f97] mb-6 group-hover:bg-[#763f97] group-hover:text-white transition-colors duration-300 shadow-sm">
                  {dir.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#763f97] transition-colors">{dir.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{dir.desc}</p>
                <div className="flex items-center text-[#763f97] font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Подробнее <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA БЛОК (Событие со смыслом) */}
      <section className="py-20 bg-[#f7f9fe]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            {/* Декор */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#ffca63] rounded-bl-full opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#763f97] rounded-tr-full opacity-5 pointer-events-none"></div>
            
            <div className="flex-1 space-y-8 relative z-10">
              <div className="inline-block px-4 py-1 bg-[#f3e8ff] text-[#763f97] rounded-full text-xs font-bold uppercase tracking-wider">
                Волонтерам
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Создайте своё <br/> <span className="text-[#763f97]">«Событие со смыслом»</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Любой праздник можно сделать благотворительным. Предложите друзьям вместо подарков сделать пожертвование на нужды детей или стариков. Это просто и вдохновляюще!
              </p>
              <Button asChild size="lg" className="bg-[#763f97] text-white hover:bg-[#763f97]/90 h-14 px-10 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                <Link href="/about">Узнать как это работает</Link>
              </Button>
            </div>
            
            <div className="flex-1 relative w-full max-w-md">
               {/* Иллюстрация */}
               <div className="relative w-full aspect-[4/3] bg-[#f7f9fe] rounded-3xl overflow-hidden border-8 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                  <Lightbulb size={80} className="text-[#ffca63] drop-shadow-md" />
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;