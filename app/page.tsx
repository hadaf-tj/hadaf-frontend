'use client';

import { useState, useEffect, useRef } from 'react';
import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { ArrowRight, Users, Baby, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import OrnamentDivider from '@/components/ui/OrnamentDivider';
import { fetchInstitutions, fetchStats } from '@/lib/api';

const DIRECTIONS = [
  { icon: <Baby size={32} />, title: 'Помощь детям', desc: 'Поддержка детских домов и интернатов необходимыми вещами и продуктами.' },
  { icon: <Users size={32} />, title: 'Пожилые люди', desc: 'Забота о домах престарелых, организация досуга и бытовая помощь.' },
];

/* ---------- Animated counter ---------- */
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{count}</div>;
}

/* ---------- useScrollReveal ---------- */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const HomePage: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ closed_needs: 0, people_helped: 0, institutions_count: 0 });

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [data, statsData] = await Promise.all([
          fetchInstitutions(),
          fetchStats().catch(() => ({ closed_needs: 0, people_helped: 0, institutions_count: 0 })),
        ]);
        setInstitutions(data.slice(0, 3));
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const missionReveal = useScrollReveal();
  const helpReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();
  const directionsReveal = useScrollReveal();

  return (
    <MainLayout>
      <div className="font-sans overflow-hidden">
        {/* 1. HERO SECTION — parallax */}
        <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${scrollY * 0.35}px)` }}
          >
            <Image
              src="/hero.webp"
              alt="Hero Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
              <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-700">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
                  Ҳадаф<br />
                  От сердца к сердцу
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                  Платформа адресной помощи, чтобы ваша помощь мгновенно находила тех, кому она нужнее всего.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white hover:text-[#1e3a8a] font-bold h-14 px-10 rounded-full shadow-xl transition-all hover:scale-105">
                    <Link href="/institutions">Хочу помочь</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 font-bold h-14 px-10 rounded-full transition-all">
                    <Link href="/about">Узнать больше</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* 2. КАРТОЧКА МИССИИ */}
        <section className="container py-7 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-37 relative z-10">
          <div
            ref={missionReveal.ref}
            className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 border-gray-100 transition-all duration-700 ${
              missionReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
              Наша миссия — прозрачная и адресная помощь
            </h2>

            {/* Статистика с анимированными счётчиками */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-black text-[#1e3a8a] mb-2">
                  <AnimatedCounter target={stats.closed_needs} />
                </div>
                <p className="text-gray-800 font-medium">Закрытых нужд</p>
              </div>
              <div>
                <div className="text-5xl font-black text-[#1e3a8a] mb-2">
                  <AnimatedCounter target={stats.people_helped} />
                </div>
                <p className="text-gray-800 font-medium">Человек получили помощь</p>
              </div>
              <div>
                <div className="text-5xl font-black text-[#1e3a8a] mb-2">
                  <AnimatedCounter target={stats.institutions_count} />
                </div>
                <p className="text-gray-800 font-medium">Учреждение в базе</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. СЕКЦИЯ "КОМУ ПОМОГАЕМ" */}
        <section className="py-7 relative">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#1e3a8a]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffca63]/10 rounded-full blur-3xl"></div>

          <div
            ref={helpReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 transition-all duration-700 ${
              helpReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
                </div>
              ) : institutions.length > 0 ? (
                institutions.map((inst, idx) => (
                  <div
                    key={inst.id}
                    className={`transform hover:scale-105 transition-all duration-500 ${
                      helpReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${idx * 150 + 200}ms` }}
                  >
                    <InstitutionCard institution={inst} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Учреждения не найдены
                </div>
              )}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-[#1e3a8a] text-white font-bold h-14 px-8 rounded-full hover:shadow-2xl transition-all group hover:scale-105">
                <Link href="/institutions" className="flex items-center gap-3">
                  Смотреть все учреждения
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        

        {/* 4. CTA БЛОК */}
        <section className="py-12 md:py-20">
          <div
            ref={ctaReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-28 relative z-10 transition-all duration-700 ${
              ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative bg-[#1e3a8a] rounded-3xl p-8 md:p-16 overflow-hidden shadow-2xl">

              <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">

                {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border border-white/10">
                    <Sparkles size={16} className="text-[#ffca63]" />
                    Станьте организатором
                  </div>

                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                    Создавайте события и <br className="hidden lg:block" />
                    <span className="text-[#ffca63]">собирайте команду</span>
                  </h2>

                  <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Хотите провести гончарный мастер-класс, викторину или субботник в конкретном детском доме? Создайте событие на платформе! Другие волонтеры увидят вашу инициативу и смогут присоединиться, нажав кнопку «Я иду». Вместе мы можем больше.
                  </p>

                  <div className="pt-4">
                    <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-black h-14 px-10 rounded-full hover:scale-105 transition-all group text-lg w-full sm:w-auto">
                      <Link href="/about" className="flex items-center justify-center gap-3">
                        Узнать, как создать событие
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* ПРАВАЯ ЧАСТЬ: ФОТОГРАФИЯ */}
                <div className="flex-1 relative w-full max-w-sm lg:max-w-md">
                  <div className="relative w-full aspect-square bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ffca63]/20 via-transparent to-transparent z-0"></div>
                    <div className="relative w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-10 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/master_klass.webp"
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

        {/* 5. НАПРАВЛЕНИЯ */}
        <OrnamentDivider opacity="opacity-16" height="h-62" />
        <section className="py-7 relative overflow-hidden -mt-54 z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzc2M2Y5NyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

          <div
            ref={directionsReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 transition-all duration-700 ${
              directionsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-7xl font-black text-gray-800 mb-6">
                <span className="bg-[#1e3a8a] bg-clip-text text-transparent">Наши направления</span>
              </h2>
              <p className="text-xl font-black text-gray-800">
                Мы работаем по двум ключевым направлениям помощи
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {DIRECTIONS.map((dir, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#1e3a8a]/30 overflow-hidden transform hover:scale-105 ${
                    directionsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${idx * 200 + 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/0 to-[#1e3a8a]/0 group-hover:from-[#1e3a8a]/[0.02] group-hover:to-[#1e3a8a]/[0.05] transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#1e3a8a] rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-[#1e3a8a]/30 group-hover:scale-110 transition-transform duration-300">
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


      </div>
    </MainLayout>
  );
};

export default HomePage;