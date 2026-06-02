"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Institution } from "@/types/project";
import InstitutionCard from "@/components/specific/InstitutionCard";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Baby,
  Sparkles,
  Loader2,
  HelpCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  ClipboardList,
  HeartHandshake,
  MessageCircleQuestion,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import { fetchInstitutions, fetchStats } from "@/lib/api";

/* ──────────────── Hero slides ──────────────── */
const HERO_SLIDES = [
  {
    image: "/hero.webp",
    title: (
      <>
        От доброго намерения
        <br />
        <span className="text-[#ffca63]">К реальной помощи</span>
      </>
    ),

    subtitle:
      "Мы показываем точные нужды детских домов и домов престарелых, чтобы вы сразу понимали, кому помочь и как сделать это напрямую.",
    cta: { label: "Хочу помочь", href: "/institutions" },
  },
  {
    image: "/hero_help.webp",
    title: (
      <>
        Помощь без догадок
        <br />
        <span className="text-[#ffca63]">Только нужное</span>
      </>
    ),
    subtitle:
      "Каждое учреждение проверено. Вы видите конкретные запросы и помогаете именно тем, чем нужно — напрямую.",
    cta: { label: "Все учреждения", href: "/institutions" },
  },
  {
    image: "/hero_events.webp",
    title: (
      <>
        Мы сделаем больше
        <br />
        <span className="text-[#ffca63]">Если мы вместе</span>
      </>
    ),
    subtitle:
      "Создавайте события, присоединяйтесь к волонтёрам и помогайте вместе.",
    cta: { label: "События", href: "/events" },
  },
];

/* ──────────────── How it works ──────────────── */
const HOW_IT_WORKS = [
  {
    id: 1,
    title: "Выбираете учреждение",
    desc: "Найдите в реестре детский дом или дом престарелых, которому хотите помочь. Все учреждения проверены.",
    icon: (
      <Search
        className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 2,
    title: "Смотрите нужды",
    desc: "Узнайте, в чём именно нуждается учреждение (вещи, продукты, развитие), и выберите, чем помочь.",
    icon: (
      <ClipboardList
        className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 3,
    title: "Доставляете помощь",
    desc: "Привезите вещи лично или организуйте доставку напрямую в учреждение. Прозрачно и от сердца.",
    icon: (
      <HeartHandshake
        className="w-20 h-20 sm:w-24 sm:h-24 text-[#ffca63] group-hover:scale-110 transition-transform duration-500"
        strokeWidth={1.5}
      />
    ),
  },
];

/* ──────────────── AnimatedCounter ──────────────── */
function AnimatedCounter({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
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

            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{target > 0 ? count : "—"}</div>;
}

/* ──────────────── useScrollReveal ──────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ──────────────── HorizontalScroller ──────────────── */
function HorizontalScroller({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className={`relative group/scroller ${className}`}>
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#1e3a8a] hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 focus:opacity-100"
          aria-label="Прокрутить влево"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
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
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
  const [stats, setStats] = useState({
    closed_needs: 0,
    people_helped: 0,
    institutions_count: 0,
  });

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 8000);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [nextSlide]);

  const resetAutoplay = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(nextSlide, 8000);
  }, [nextSlide]);

  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  const nextEventDeck = useCallback(() => {
    if (events.length === 0) return;
    setCurrentEventIdx((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevEventDeck = useCallback(() => {
    if (events.length === 0) return;
    setCurrentEventIdx((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  useEffect(() => {
    const evInterval = setInterval(nextEventDeck, 5000);
    return () => clearInterval(evInterval);
  }, [nextEventDeck]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { fetchEvents } = await import("@/lib/api");

        const [data, statsData, eventsData] = await Promise.all([
          fetchInstitutions(),
          fetchStats().catch(() => ({
            closed_needs: 0,
            people_helped: 0,
            institutions_count: 0,
          })),
          fetchEvents().catch(() => []),
        ]);
        setInstitutions(data.slice(0, 6));
        setStats(statsData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading data:", error);
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
          className="relative w-full h-screen min-h-[500px] overflow-hidden bg-black"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Edge Navigation Arrows (Только для десктопа/планшета) */}
          <button
            onClick={() => {
              prevSlide();
              resetAutoplay();
            }}
            className="hidden md:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 rounded-full items-center justify-center transition-all shadow-lg"
            aria-label="Предыдущий слайд"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={() => {
              nextSlide();
              resetAutoplay();
            }}
            className="hidden md:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 rounded-full items-center justify-center transition-all shadow-lg"
            aria-label="Следующий слайд"
          >
            <ArrowRight size={24} className="lg:w-6 lg:h-6" />
          </button>

          {/* Opacity Track for cross-fade topology */}
          <div className="relative w-full h-full">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                  currentSlideIndex === idx
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0",
                )}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={idx === 0}
                    className={cn(
                      "object-cover transition-transform duration-[10000ms] ease-out [object-position:75%_center] sm:[object-position:center_center]",
                      currentSlideIndex === idx ? "scale-105" : "scale-100",
                    )}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
                <div className="absolute inset-0 flex items-end sm:items-center pb-20 sm:pb-0">
                  <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
                    <div className="max-w-2xl space-y-4 sm:space-y-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                        {slide.subtitle}
                      </p>
                      <div className="pt-2 sm:pt-4 flex items-center gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white hover:text-[#1e3a8a] font-bold h-12 sm:h-14 px-8 sm:px-10 rounded-full shadow-xl transition-all hover:scale-105 text-base"
                        >
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

        {/* ══════════════════════════════════════════════════════════════
           2. ДОВЕРИЕ В ЦИФРАХ — Premium stats strip
           ══════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-b from-[#0f2557] to-[#1e3a8a] overflow-hidden">
          {/* Fixed ornament background */}
          <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-fixed bg-repeat bg-[length:300px] opacity-[0.08] pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2557]/60 via-transparent to-[#1e3a8a]/40 pointer-events-none"></div>
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#ffca63]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

          <div
            ref={missionReveal.ref}
            className={`container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-14 sm:py-20 md:py-24 relative z-10 transition-all duration-1000 ${
              missionReveal.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Section label */}
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Реальная помощь в цифрах
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                {
                  value: stats.closed_needs,
                  label: "Нужд закрыто",
                  icon: <HeartHandshake size={28} className="text-[#ffca63]" />,
                },
                {
                  value: stats.people_helped,
                  label: "Получили помощь",
                  icon: <Users size={28} className="text-[#ffca63]" />,
                },
                {
                  value: stats.institutions_count,
                  label: "Учреждений в реестре",
                  icon: <ShieldCheck size={28} className="text-[#ffca63]" />,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="relative group bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#ffca63]/30 transition-all duration-500 text-center overflow-hidden"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#ffca63]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ffca63]/10 group-hover:border-[#ffca63]/30 transition-all duration-500">
                      {stat.icon}
                    </div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">
                      <AnimatedCounter target={stat.value} />
                    </div>
                    <p className="text-white/60 font-semibold text-sm sm:text-base uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           3. КОМУ ПОМОГАЕМ — Institution showcase
           ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-[#f8fafc] to-white overflow-hidden">
          {/* Premium decorative blurs */}
          <div className="absolute top-0 left-0 w-[800px] h-[400px] bg-gradient-to-br from-[#1e3a8a]/[0.03] to-transparent rounded-full blur-[80px] -translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gradient-to-tl from-[#ffca63]/[0.06] to-transparent rounded-full blur-[80px] translate-x-1/4 pointer-events-none"></div>

          <div
            ref={helpReveal.ref}
            className={`relative z-10 transition-all duration-1000 ${
              helpReveal.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Editorial section header */}
            <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 mb-10 sm:mb-14 md:mb-16">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-[3px] bg-[#ffca63] rounded-full"></div>
                  <span className="text-[#1e3a8a] font-bold text-sm uppercase tracking-[0.15em]">
                    Учреждения
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] mb-4 sm:mb-6">
                  Кому мы{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#1e3a8a]">
                      помогаем
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#ffca63]/25 -z-0 rounded-full"></span>
                  </span>
                </h2>
                <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                  Каждое учреждение в реестре проверено. Вы видите настоящие
                  нужды и можете помочь адресно — без посредников и бюрократии.
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-[#1e3a8a]/10 border-t-[#1e3a8a] animate-spin"></div>
                  </div>
                </div>
              ) : institutions.length > 0 ? (
                <HorizontalScroller>
                  <div className="flex-shrink-0 w-5 sm:w-6 md:w-12 xl:w-28 2xl:w-[calc(50vw-720px+112px)] border-r border-transparent"></div>

                  {institutions.map((inst) => (
                    <div
                      key={inst.id}
                      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] py-3"
                    >
                      <InstitutionCard institution={inst} />
                    </div>
                  ))}

                  {/* "View all" — premium pill card */}
                  <Link
                    href="/institutions"
                    className="flex-shrink-0 w-[200px] sm:w-[260px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#1e3a8a]/15 hover:border-[#1e3a8a]/40 bg-gradient-to-b from-[#1e3a8a]/[0.02] to-[#1e3a8a]/[0.06] hover:from-[#1e3a8a]/[0.04] hover:to-[#1e3a8a]/[0.10] transition-all duration-500 group mr-8"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#1e3a8a] transition-all duration-500">
                      <ArrowRight
                        size={22}
                        className="text-[#1e3a8a] group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-[#1e3a8a] font-black text-sm tracking-wide">
                      Смотреть все
                    </span>
                    <span className="text-gray-400 text-xs mt-1 font-medium">
                      {institutions.length}+ учреждений
                    </span>
                  </Link>
                </HorizontalScroller>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Учреждения не найдены
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           5. CTA БЛОК — Cinematic events callout
           ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-24 md:py-32 bg-[#1e3a8a] overflow-hidden">
          {/* Layered background */}
          <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-fixed bg-repeat bg-[length:300px] opacity-[0.08] pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2557]/60 via-transparent to-[#1e3a8a]/40 pointer-events-none"></div>
          {/* Ambient highlights */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#ffca63]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

          <div
            ref={ctaReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-28 relative z-10 transition-all duration-1000 ${
              ctaReveal.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image side — cinematic frame */}
              <div className="flex-1 w-full max-w-md lg:max-w-none relative order-last lg:order-first">
                <div className="relative">
                  {/* Decorative shadow card behind */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] bg-[#ffca63]/20 pointer-events-none"></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border-2 border-white/10">
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[520px]">
                      <Image
                        src="/landing_events.webp"
                        alt="Создать событие"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Glass overlay at bottom */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent h-1/3 pointer-events-none"></div>
                    {/* Floating glass badge */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#ffca63] flex items-center justify-center flex-shrink-0">
                        <Sparkles size={22} className="text-[#1e3a8a]" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm sm:text-base">
                          Создайте событие
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Другие волонтёры присоединятся
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08]">
                  Превратите <br className="hidden lg:block" />
                  любой праздник в <span className="text-[#ffca63]">добро</span>
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Любой мастер-класс, концерт или праздник может стать
                  благотворительным. Создайте событие на платформе — волонтёры
                  увидят его и присоединятся. Вместе мы можем больше.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-black h-14 px-10 rounded-full hover:scale-[1.03] transition-all group text-base sm:text-lg shadow-xl shadow-[#ffca63]/20"
                  >
                    <Link
                      href="/events"
                      className="flex items-center justify-center gap-3"
                    >
                      Календарь событий
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/20 text-white hover:bg-white/10 font-bold h-14 px-10 rounded-full transition-all text-base sm:text-lg backdrop-blur-sm"
                  >
                    <Link
                      href="/about"
                      className="flex items-center justify-center gap-3"
                    >
                      Узнать больше
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           4. КАК ЭТО РАБОТАЕТ — Premium numbered steps
           ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-16 sm:py-20 md:py-28 bg-white overflow-hidden">
          {/* Ambient environment */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#1e3a8a]/[0.03] to-transparent rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#ffca63]/[0.04] to-transparent rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

          <div
            ref={howItWorksReveal.ref}
            className={`container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 transition-all duration-1000 ${
              howItWorksReveal.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Section header */}
            <div className="text-center mb-14 md:mb-20">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-12 h-[3px] bg-[#ffca63] rounded-full"></div>
                <span className="text-[#1e3a8a] font-bold text-sm uppercase tracking-[0.15em]">
                  Процесс
                </span>
                <div className="w-12 h-[3px] bg-[#ffca63] rounded-full"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] mb-4">
                Три шага к{" "}
                <span className="text-[#1e3a8a]">реальной помощи</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Простой и прозрачный процесс от выбора учреждения до доставки
                помощи
              </p>
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
              <HorizontalScroller>
                <div className="flex-shrink-0 w-2"></div>
                {HOW_IT_WORKS.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] ml-4 mr-2 pt-2"
                  >
                    <div className="relative bg-gradient-to-b from-[#f8fafc] to-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group h-full">
                      {/* Step number badge — inside card, not overflowing */}
                      <div className="w-11 h-11 mb-5 bg-gradient-to-br from-[#1e3a8a] to-[#2d4fa5] rounded-xl shadow-md shadow-[#1e3a8a]/25 flex items-center justify-center">
                        <span className="text-[#ffca63] font-black text-lg">
                          {step.id}
                        </span>
                      </div>

                      {/* Icon container */}
                      <div className="w-20 h-20 mx-auto mb-6 rounded-[1.5rem] bg-[#1e3a8a] flex items-center justify-center shadow-xl shadow-[#1e3a8a]/20 group-hover:scale-105 transition-transform duration-500">
                        {step.icon}
                      </div>

                      <h3 className="text-xl font-black text-gray-900 mb-3 text-center group-hover:text-[#1e3a8a] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed text-center">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-4 border-r border-transparent"></div>
              </HorizontalScroller>
            </div>

            {/* Desktop view */}
            <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-10 relative max-w-5xl mx-auto">
              {/* Connecting line through step badges */}
              <div className="absolute top-[52px] left-[20%] right-[20%] h-[2px] z-0">
                <div className="w-full h-full bg-gradient-to-r from-[#1e3a8a]/5 via-[#1e3a8a]/15 to-[#1e3a8a]/5"></div>
                <div className="absolute inset-0 border-t-2 border-dashed border-[#1e3a8a]/10"></div>
              </div>

              {HOW_IT_WORKS.map((step, idx) => (
                <div
                  key={step.id}
                  className={`relative group transition-all duration-700 ${
                    howItWorksReveal.visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${idx * 250 + 200}ms` }}
                >
                  {/* Premium card */}
                  <div className="relative bg-gradient-to-b from-[#f8fafc] to-white rounded-[2rem] p-8 lg:p-10 border border-gray-100/80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center overflow-hidden h-full">
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>

                    {/* Step number — floating badge */}
                    <div className="w-14 h-14 mx-auto mb-7 bg-gradient-to-br from-[#1e3a8a] to-[#2d4fa5] rounded-2xl shadow-lg shadow-[#1e3a8a]/25 flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <span className="text-[#ffca63] font-black text-2xl">
                        {step.id}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-24 h-24 mx-auto mb-7 rounded-[1.5rem] bg-[#1e3a8a] flex items-center justify-center shadow-xl shadow-[#1e3a8a]/15 relative z-10 group-hover:shadow-2xl group-hover:shadow-[#1e3a8a]/25 transition-all duration-500">
                      {step.icon}
                    </div>

                    <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-3 group-hover:text-[#1e3a8a] transition-colors relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-xs mx-auto relative z-10">
                      {step.desc}
                    </p>
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
