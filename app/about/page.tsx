'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';

import { Target, Heart, Shield, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="font-sans overflow-hidden bg-[#f8fafc]">

        {/* 1. HERO SECTION (Верхний баннер) */}
        <section className="relative w-full h-[450px] lg:h-[500px]">
          <Image
            src="/hero_about.webp" // Основной баннер (можно оставить тот же или поменять)
            alt="About Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/90 to-[#1e3a8a]/40"></div>

          <div className="absolute inset-0 flex items-center">
            {/* Контейнер по вашим стандартам */}
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
              <div className="max-w-3xl space-y-6 animate-in slide-in-from-bottom-10 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-bold border border-white/20">
                  <Users size={16} className="text-[#ffca63]" />
                  О проекте
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Мы строим мост <br />
                  <span className="text-[#ffca63]">доверия и помощи</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl">
                  Ҳадаф — это платформа, объединяющая тех, кто хочет помочь, с проверенными государственными учреждениями: детскими домами и домами престарелых.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ИСТОРИЯ И ПРОБЛЕМА */}
        <section className="py-7 bg-white relative z-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Левая часть - Текст */}
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-[#1e3a8a] leading-tight">
                  Почему мы <br />
                  появились?
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    В Таджикистане тысячи людей хотят помочь <span className="font-bold text-gray-900">детским домам и домам престарелых</span>. Но часто возникают вопросы: «Кому помощь нужнее всего прямо сейчас?» и «Дойдет ли она до адресата?».
                  </p>
                  <p>
                    Мы решили убрать этот барьер. Мы создали единый реестр <span className="font-bold text-gray-900">проверенных государственных учреждений</span> с актуальными списками нужд.
                  </p>
                  <p>
                    Больше никаких звонков наугад. Вы видите конкретную нужду — будь то продукты для интерната или лекарства для дома престарелых — и закрываете её. Напрямую.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Проверенные учреждения',
                    'Помощь домам престарелых',
                    'Прямая связь',
                    '100% прозрачности'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#ffca63] flex-shrink-0" size={24} />
                      <span className="font-bold text-[#1e3a8a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая часть - Визуал (hero_about.webp) */}
              <div className="flex-1 relative w-full h-[400px] lg:h-[500px]">
                <div className="absolute inset-0 bg-[#1e3a8a] rounded-[3rem] rotate-3 transform translate-x-4 translate-y-4 opacity-10"></div>
                <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/hero_about_2.webp"
                    alt="Волонтеры помогают учреждениям"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ОРНАМЕНТ + ЦЕННОСТИ (Секция с наложением) */}
        <section className="py-7 md:py-12">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="bg-[#1e3a8a] rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-repeat mix-blend-overlay"></div>
              </div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl font-black text-white">
                  Хотите стать частью изменений?
                </h2>
                <p className="text-lg md:text-xl text-white/90">
                  Мы всегда ищем волонтеров, партнеров и просто неравнодушных людей, готовых развивать культуру помощи в Таджикистане.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-bold h-14 px-10 rounded-full text-lg">
                    <Link href="/institutions">Начать помогать</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-[#1e3a8a] bg-transparent font-bold h-14 px-10 rounded-full text-lg">
                    <Link href="mailto:team@hadaf.tj">Написать нам</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Орнамент высокий и прозрачный */}
        {/* Секция наезжает на орнамент (-mt-80) */}
        <section className="py-7 relative overflow-hidden z-10">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="text-center mb-16"> {/* pt-20 чтобы компенсировать наезд и текст не прилип к верху */}
              <h2 className="text-3xl md:text-5xl font-black text-[#1e3a8a] mb-6">
                Наши принципы
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                Три кита, на которых строится работа платформы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield size={40} />,
                  title: 'Безопасность',
                  desc: 'Мы проверяем каждое учреждение и заявку на помощь. Никаких мошенников, только верифицированные нужды.',
                  color: 'bg-blue-50 text-blue-600'
                },
                {
                  icon: <Target size={40} />,
                  title: 'Адресность',
                  desc: 'Помощь работает лучше всего, когда она точечная. Мы помогаем закрывать конкретные нужды конкретных учреждений.',
                  color: 'bg-yellow-50 text-yellow-600'
                },
                {
                  icon: <Heart size={40} />,
                  title: 'Открытость',
                  desc: 'Мы верим, что добрые дела должны быть видны. Публичные отчеты вдохновляют других присоединиться.',
                  color: 'bg-green-50 text-green-600'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#1e3a8a] mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CTA - JOIN TEAM */}


      </div>
    </MainLayout>
  );
}