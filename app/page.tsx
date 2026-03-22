'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { ArrowRight, ArrowLeft, Users, Baby, Sparkles, Loader2, HelpCircle, Plus, Minus, ChevronLeft, ChevronRight, ChevronDown, Search, ClipboardList, HeartHandshake, MessageCircleQuestion, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import OrnamentDivider from '@/components/ui/OrnamentDivider';
import { fetchInstitutions, fetchStats } from '@/lib/api';

/* ──────────────── Hero slides ──────────────── */
const HERO_SLIDES = [
  {
    image: '/hero.webp',
    title: <>Ҳадаф<br />От сердца к сердцу</>,
    subtitle: 'Платформа адресной помощи, чтобы ваша помощь мгновенно находила тех, кому она нужнее всего.',
    cta: { label: 'Хочу помочь', href: '/institutions' },
  },
  {
    image: '/hero_about.webp',
    title: <>Прозрачность<br />и доверие</>,
    subtitle: 'Каждое учреждение в реестре проверено. Вы видите реальные нужды и можете помочь адресно.',
    cta: { label: 'Все учреждения', href: '/institutions' },
  },
  {
    image: '/master_klass.webp',
    title: <>Вместе<br />мы можем больше</>,
    subtitle: 'Создавайте события, присоединяйтесь к волонтёрам и делайте мир лучше каждый день.',
    cta: { label: 'События', href: '/events' },
  },
];

/* ──────────────── How it works ──────────────── */
const HOW_IT_WORKS = [
  { 
    id: 1,
    title: 'Выбираете учреждение', 
    desc: 'Найдите в реестре детский дом или дом престарелых, которому хотите помочь. Все учреждения проверены.',
    icon: <Search className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
  },
  { 
    id: 2,
    title: 'Смотрите нужды', 
    desc: 'Узнайте, в чём именно нуждается учреждение (вещи, продукты, развитие), и выберите, чем помочь.',
    icon: <ClipboardList className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
  },
  { 
    id: 3,
    title: 'Доставляете помощь', 
    desc: 'Привезите вещи лично или организуйте доставку напрямую в учреждение. Прозрачно и от сердца.',
    icon: <HeartHandshake className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
  },
];



/* ──────────────── AnimatedCounter ──────────────── */
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

  return <div ref={ref}>{target > 0 ? count : '—'}</div>;
}

/* ──────────────── useScrollReveal ──────────────── */
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

/* ──────────────── HorizontalScroller ──────────────── */
function HorizontalScroller({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className={`relative group/scroller ${className}`}>
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#1e3a8a] hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 focus:opacity-100"
          aria-label="Прокрутить влево"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#1e3a8a] hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 focus:opacity-100"
          aria-label="Прокрутить вправо"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Fade edges (removed per user request: "не нужно чтобы появлялась мнимая стена слева") */}
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   HOMEPAGE
   ════════════════════════════════════════════════ */
const HomePage: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ closed_needs: 0, people_helped: 0, institutions_count: 0 });

  // Mouse and Scroll Parallax
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider Cross-fade Topology
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance hero slides
  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 8000);
    return () => { if (slideInterval.current) clearInterval(slideInterval.current); };
  }, [nextSlide]);

  const resetAutoplay = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(nextSlide, 8000);
  }, [nextSlide]);

  // Events Deck State
  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  const nextEventDeck = useCallback(() => {
    if (events.length === 0) return;
    setCurrentEventIdx(prev => (prev + 1) % events.length);
  }, [events.length]);
  
  const prevEventDeck = useCallback(() => {
    if (events.length === 0) return;
    setCurrentEventIdx(prev => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  useEffect(() => {
    const evInterval = setInterval(nextEventDeck, 5000); // Auto-advance deck every 5s
    return () => clearInterval(evInterval);
  }, [nextEventDeck]);

  // Touch handling for hero
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide(); else prevSlide(); // swipe left -> next, swipe right -> prev
      resetAutoplay();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { fetchEvents } = await import('@/lib/api');
        
        const [data, statsData, eventsData] = await Promise.all([
          fetchInstitutions(),
          fetchStats().catch(() => ({ closed_needs: 0, people_helped: 0, institutions_count: 0 })),
          fetchEvents().catch(() => []) 
        ]);
        setInstitutions(data.slice(0, 6));
        setStats(statsData);
        setEvents(eventsData || []);
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
  const howItWorksReveal = useScrollReveal();

  return (
    <MainLayout>
      <div className="font-sans overflow-hidden">

        {/* ──── 1. HERO SLIDER ──── */}
        <section
          className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Edge Navigation Arrows (Только для десктопа/планшета) */}
          <button
            onClick={() => { prevSlide(); resetAutoplay(); }}
            className="hidden md:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 rounded-full items-center justify-center transition-all shadow-lg"
            aria-label="Предыдущий слайд"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button
            onClick={() => { nextSlide(); resetAutoplay(); }}
            className="hidden md:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 rounded-full items-center justify-center transition-all shadow-lg"
            aria-label="Следующий слайд"
          >
            <ArrowRight size={24} className="lg:w-6 lg:h-6" />
          </button>

          {/* Opacity Track for cross-fade topology */}
          <div 
            className="relative w-full h-full"
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                  currentSlideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={idx === 0} 
                    className={cn("object-cover transition-transform duration-[10000ms] ease-out", currentSlideIndex === idx ? "scale-105" : "scale-100")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
                    <div className="max-w-2xl space-y-4 sm:space-y-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                        {slide.subtitle}
                      </p>
                      <div className="pt-2 sm:pt-4 flex items-center gap-4">
                        <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white hover:text-[#1e3a8a] font-bold h-12 sm:h-14 px-8 sm:px-10 rounded-full shadow-xl transition-all hover:scale-105 text-base">
                          <Link href={slide.cta.href}>{slide.cta.label}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──── 2. МИССИЯ (статс-карточка, наложенная на hero) ──── */}
        <section className="container py-4 sm:py-7 mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 -mt-20 sm:-mt-28 md:-mt-37 relative z-10">
          <div
            ref={missionReveal.ref}
            className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border-gray-100 transition-all duration-700 ${
              missionReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-6 sm:mb-8 text-center z-index=10">
              Наша миссия — прозрачная и адресная помощь
            </h2>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 text-center">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] mb-1 sm:mb-2">
                  <AnimatedCounter target={stats.closed_needs} />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Закрытых нужд</p>
              </div>
              <div className="border-x border-gray-100">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] mb-1 sm:mb-2">
                  <AnimatedCounter target={stats.people_helped} />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Получили помощь</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] mb-1 sm:mb-2">
                  <AnimatedCounter target={stats.institutions_count} />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Учреждений</p>
              </div>
            </div>
          </div>
        </section>

        {/* ──── 3. КОМУ ПОМОГАЕМ — horizontal scrollable cards ──── */}
        <section className="py-8 sm:py-12 md:py-16 relative">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#1e3a8a]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffca63]/10 rounded-full blur-3xl"></div>

          <div
            ref={helpReveal.ref}
            className={`relative z-10 transition-all duration-700 ${
              helpReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Section header */}
            <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
              <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-2 sm:mb-3">
                    <span className="text-[#1e3a8a]">Кому помогаем</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-500">
                    Проверенные государственные учреждения с реальными нуждами
                  </p>
                </div>
              </div>
            </div>

            {/* Horizontal scrolling cards */}
            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
                </div>
              ) : institutions.length > 0 ? (
                <HorizontalScroller>
                  {/* Visual Spacer for left alignment */}
                  <div className="flex-shrink-0 w-5 sm:w-6 md:w-12 xl:w-28 2xl:w-[calc(50vw-720px+112px)] border-r border-transparent"></div>
                  
                  {institutions.map((inst) => (
                    <div
                      key={inst.id}
                      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px]"
                    >
                      <InstitutionCard institution={inst} />
                    </div>
                  ))}
                  {/* "View all" card restored per user request */}
                  <Link
                    href="/institutions"
                    className="flex-shrink-0 w-[200px] sm:w-[240px] flex flex-col items-center justify-center bg-[#1e3a8a]/5 rounded-2xl border-2 border-dashed border-[#1e3a8a]/20 hover:border-[#1e3a8a]/40 hover:bg-[#1e3a8a]/10 transition-all group mr-8"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} className="text-[#1e3a8a]" />
                    </div>
                    <span className="text-[#1e3a8a] font-bold text-sm">Смотреть все</span>
                  </Link>
                </HorizontalScroller>
              ) : (
                <div className="text-center py-12 text-gray-500">Учреждения не найдены</div>
              )}
            </div>
          </div>
        </section>

        {/* ──── 4. CTA БЛОК (События со смыслом) ──── */}
        <section className="relative py-16 md:py-24 bg-[#1e3a8a] overflow-hidden">
          {/* Suzani background canvas */}
          <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-fixed bg-repeat bg-[length:300px] opacity-[0.15] pointer-events-none mix-blend-overlay"></div>
          
          <div
            ref={ctaReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-28 relative z-10 transition-all duration-700 ${
              ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
              
              {/* ЛЕВАЯ ЧАСТЬ: Интерактивный Слайдер карточек событий */}
              {events.length > 0 ? (
                <div className="flex-1 w-full max-w-[340px] sm:max-w-md mx-auto lg:max-w-none relative mt-8 lg:mt-0">
                  <div className="relative h-[520px] sm:h-[550px] md:h-[600px] flex items-center justify-center perspective-[1200px]">
                    {events.map((ev, idx) => {
                      let diff = idx - currentEventIdx;
                      
                      const len = events.length;
                      
                      if (diff > Math.floor(len / 2)) diff -= len;
                      else if (diff < -Math.floor(len / 2)) diff += len;

                      if (diff < -1 || diff > 2) return null;

                      const isDismissed = diff < 0; 
                      
                      const translateX = isDismissed ? '100%' : `${-diff * 1.5}rem`; 
                      const translateY = isDismissed ? '10%' : `${diff * 0.75}rem`;
                      const scale = isDismissed ? 1.05 : Math.max(0.85, 1 - (diff * 0.05));
                      
                      const zIndex = isDismissed ? 40 : 30 - diff;
                      const opacity = isDismissed ? 0 : diff === 2 ? 0.3 : diff === 1 ? 0.7 : 1;
                      const isInteractive = diff === 0;

                      const formattedDate = ev.event_date ? new Date(ev.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Даты уточняются';
                      const locationName = ev.institution?.name || ev.institution_name || 'Учреждение не указано';

                      return (
                        <div
                          key={ev.id}
                          onClick={() => isInteractive && nextEventDeck()}
                          className={`absolute left-0 right-0 top-0 bottom-0 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isInteractive ? 'cursor-pointer sm:hover:-translate-translate-y-2' : 'pointer-events-none'}`}
                          style={{
                            transform: `translate(${translateX}, ${translateY}) scale(${scale}) rotate(${isDismissed ? 5 : -diff * 2}deg)`,
                            zIndex,
                            opacity,
                            transformOrigin: 'bottom center',
                            boxShadow: diff === 0 ? '-10px 25px 40px -12px rgba(0, 0, 0, 0.4)' : '-5px 10px 15px -3px rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          <div className="relative h-[45%] sm:h-[55%] w-full shrink-0">
                            <Image src={ev.imageUrl || '/master_klass.webp'} alt="Event" fill className="object-cover rounded-t-3xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl"></div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[#1e3a8a] font-bold text-xs shadow-sm flex items-center gap-2">
                               {formattedDate}
                            </div>
                          </div>
                          
                          <div className={`p-4 sm:p-5 md:p-7 flex-1 flex flex-col justify-between bg-white rounded-b-3xl transition-opacity duration-300 ${isInteractive ? 'opacity-100' : 'opacity-0 sm:opacity-100'}`}>
                            <div>
                              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#1e3a8a] mb-2 line-clamp-1">{ev.title}</h3>
                              <p className="text-gray-600 line-clamp-3 text-xs sm:text-sm md:text-base leading-relaxed">{ev.description}</p>
                            </div>
                            <div className="font-bold text-[#ffca63] text-xs sm:text-sm flex items-center justify-between mt-3 sm:mt-4">
                               <span className="bg-[#1e3a8a] px-3 py-1.5 rounded-full truncate max-w-[50%] sm:max-w-[60%] inline-block">
                                 {locationName}
                               </span>
                               {isInteractive && (
                                 <div className="flex items-center justify-end gap-2 shrink-0">
                                   <button 
                                     onClick={(e) => { e.stopPropagation(); prevEventDeck(); }}
                                     className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-[#1e3a8a] flex items-center justify-center hover:bg-[#ffca63] hover:text-[#1e3a8a] transition-colors"
                                     aria-label="Предыдущее событие"
                                   >
                                      <ArrowLeft size={18} />
                                   </button>
                                   <button 
                                     onClick={(e) => { e.stopPropagation(); nextEventDeck(); }}
                                     className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-[#1e3a8a] flex items-center justify-center hover:bg-[#ffca63] hover:text-[#1e3a8a] transition-colors"
                                     aria-label="Следующее событие"
                                   >
                                      <ArrowRight size={18} />
                                   </button>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center relative mt-8 lg:mt-0 shadow-2xl h-full min-h-[400px]">
                  <Sparkles size={48} className="text-[#ffca63] mb-6 opacity-90" />
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">Событий пока нет</h3>
                  <p className="text-white/80 text-sm sm:text-lg max-w-sm leading-relaxed">
                    Но вы можете стать первым, кто создаст благотворительное событие и подаст пример другим!
                  </p>
                </div>
              )}

              {/* ПРАВАЯ ЧАСТЬ: Текст призыва */}
              <div className="flex-1 space-y-5 sm:space-y-6 lg:space-y-8 text-center lg:text-left z-10 mt-6 sm:mt-8 lg:mt-0 order-first lg:order-last">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border border-white/20 shadow-sm">
                  <Sparkles size={16} className="text-[#ffca63]" />
                  События со смыслом
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                  Создайте своё <br className="hidden lg:block" />
                  <span className="text-[#ffca63]">событие</span>
                </h2>

                <p className="text-sm sm:text-base lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Любой праздник или мастер-класс можно сделать благотворительным. Создайте событие на платформе — другие волонтеры присоединятся. Вместе мы можем больше!
                </p>

                <div className="pt-2 sm:pt-4 flex justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-black h-12 sm:h-14 px-8 sm:px-10 rounded-full hover:scale-105 transition-all group text-base sm:text-lg w-full sm:w-auto shadow-xl shadow-[#ffca63]/30">
                    <Link href="/events" className="flex items-center justify-center gap-3">
                      Календарь событий
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──── 5. КАК ЭТО РАБОТАЕТ (HOW IT WORKS) ──── */}
        <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-white z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#f3f9ff] to-transparent rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

          <div
            ref={howItWorksReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 transition-all duration-1000 ${
              howItWorksReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e3a8a]">
                Как это работает
              </h2>
            </div>

            <div className="md:hidden relative w-[100vw] -ml-6 pr-6">
              <HorizontalScroller>
                {HOW_IT_WORKS.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className="flex flex-col items-center text-center relative z-10 group flex-shrink-0 w-[280px] sm:w-[320px] ml-6 mr-2"
                  >
                    {/* Image Container */}
                    <div className="w-full aspect-square relative mb-6 rounded-[2.5rem] bg-[#1e3a8a] border-2 border-transparent group-hover:border-[#ffca63]/30 overflow-hidden transition-all duration-500 shadow-xl flex items-center justify-center">
                      <div className="absolute top-4 left-4 w-10 h-10 bg-[#ffca63] rounded-2xl shadow-sm text-[#1e3a8a] font-black text-xl flex items-center justify-center z-20">
                        {step.id}
                      </div>
                      
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {/* We use React.cloneElement to easily override styles on mobile if needed, but it works fine as is */}
                        {step.icon}
                      </div>
                    </div>

                    {/* Text Details */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] mb-3 group-hover:text-[#ffca63] transition-colors">{step.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                ))}
                {/* Visual Spacer for right padding in scroller */}
                <div className="flex-shrink-0 w-4 border-r border-transparent"></div>
              </HorizontalScroller>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-12 relative max-w-6xl mx-auto">
              {/* Desktop connecting line */}
              <div className="absolute top-[110px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#1e3a8a]/10 to-transparent border-t border-dashed border-[#1e3a8a]/20 z-0"></div>

              {HOW_IT_WORKS.map((step, idx) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center text-center relative z-10 group"
                  style={{ transitionDelay: `${idx * 200 + 100}ms` }}
                >
                  {/* Image Container with Hover Effect */}
                  <div className="w-full max-w-[280px] aspect-square relative mb-6 rounded-[2.5rem] bg-[#1e3a8a] border-2 border-transparent group-hover:border-[#ffca63]/30 overflow-hidden transition-all duration-500 shadow-xl group-hover:shadow-2xl flex items-center justify-center">
                    <div className="absolute top-4 left-4 w-10 h-10 bg-[#ffca63] rounded-2xl shadow-sm text-[#1e3a8a] font-black text-xl flex items-center justify-center z-20">
                      {step.id}
                    </div>
                    
                    <div className="relative z-10">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="text-xl font-black text-[#1e3a8a] mb-3 group-hover:text-[#ffca63] transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{step.desc}</p>
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