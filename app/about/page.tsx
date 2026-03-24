'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Target, Heart, Shield, Users, CheckCircle2, Linkedin, Send, Loader2 } from 'lucide-react';
import { fetchTeamMembers, TeamMember } from '@/lib/api';

const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-orange-400 to-red-500',
  'from-green-400 to-emerald-500',
  'from-cyan-400 to-blue-500',
  'from-fuchsia-400 to-purple-500',
  'from-indigo-400 to-violet-500',
  'from-rose-400 to-pink-500',
  'from-violet-400 to-fuchsia-500',
  'from-sky-400 to-blue-500',
  'from-yellow-400 to-amber-500',
];

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function AboutPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    fetchTeamMembers()
      .then(data => setMembers(data || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="font-sans overflow-hidden bg-[#f8fafc]">

        {/* 1. HERO SECTION — full screen, mobile responsive */}
        <section className="relative w-full h-screen min-h-[500px]">
          <Image
            src="/about_hero.webp"
            alt="About Hero"
            fill
            className="object-cover [object-position:65%_center] sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          <div className="absolute inset-0 flex items-end sm:items-center pb-16 sm:pb-0">
            <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
              <div className="max-w-3xl space-y-3 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Мы меняем культуру <br className="hidden sm:block" />
                  <span className="text-[#ffca63]">благотворительности</span>
                </h1>

                <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl">
                  Ҳадаф — команда людей, которые делают помощь прозрачной и адресной. Вы точно знаете, кому помогаете, что нужно и куда идут ваши усилия.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ИСТОРИЯ И ПРОБЛЕМА — mobile responsive */}
        <section className="py-12 sm:py-16 md:py-24 bg-white relative z-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-20">
              <div className="flex-1 space-y-4 sm:space-y-6">
                {/* Editorial accent */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-[3px] bg-[#ffca63] rounded-full"></div>
                  <span className="text-[#1e3a8a] font-bold text-xs sm:text-sm uppercase tracking-[0.15em]">Наша история</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1e3a8a] leading-tight">
                  Почему мы <br className="hidden sm:block" />
                  появились?
                </h2>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    В Таджикистане тысячи людей, которые хотят помочь <span className="font-bold text-gray-900">детским домам и домам престарелых</span>. Но часто возникают вопросы: «Кому помощь нужнее всего прямо сейчас?» и «Дойдет ли она до адресата?».
                  </p>
                  <p>
                    Чтобы убрать этот барьер, мы создали единый реестр <span className="font-bold text-gray-900">проверенных государственных учреждений</span> с актуальными списками нужд.
                  </p>
                  <p>
                    Больше никаких звонков наугад. Вы видите конкретную нужду — будь то продукты для интерната или лекарства для дома престарелых — и закрываете её напрямую.
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    'Проверенные учреждения',
                    'Помощь домам престарелых',
                    'Прямая связь',
                    '100% прозрачности'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                      <CheckCircle2 className="text-[#ffca63] flex-shrink-0" size={20} />
                      <span className="font-bold text-[#1e3a8a] text-sm sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:flex-1 relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-[500px]">
                <div className="relative h-full w-full rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/about_why_do_we_exist.webp"
                    alt="Волонтеры помогают с заботой и уважением"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 4. КОМАНДА — premium cards with lively hover */}
        <section className="pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50/50 relative z-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            {/* Section header */}
            <div className="text-center mb-10 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-[3px] bg-[#ffca63] rounded-full"></div>
                <span className="text-[#1e3a8a] font-bold text-xs sm:text-sm uppercase tracking-[0.15em]">Люди</span>
                <div className="w-10 h-[3px] bg-[#ffca63] rounded-full"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1e3a8a] mb-3 sm:mb-6">
                Команда Ҳадаф
              </h2>
              <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Люди, которые создали и продолжают развивать эту платформу. Мы объединились ради общей идеи прозрачной благотворительности.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#1e3a8a]">
                <div className="w-14 h-14 rounded-full border-4 border-[#1e3a8a]/10 border-t-[#1e3a8a] animate-spin mb-4"></div>
                <p className="font-bold text-lg">Загрузка...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {members.map((member, idx) => (
                  <div
                    key={member.id}
                    className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 ease-out group h-full hover:shadow-2xl hover:shadow-[#1e3a8a]/[0.08] hover:-translate-y-2 hover:border-[#1e3a8a]/10 relative overflow-hidden"
                  >
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>

                    {/* Photo with zoom on hover */}
                    {member.photo_url && !imageErrors[member.id] ? (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg mb-5 sm:mb-6 border-4 border-white ring-2 ring-gray-100 group-hover:ring-[#ffca63]/30 group-hover:shadow-xl transition-all duration-500 relative z-10">
                        <Image 
                          src={member.photo_url} 
                          alt={member.full_name} 
                          width={144} 
                          height={144} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" 
                          onError={() => handleImageError(member.id)}
                        />
                      </div>
                    ) : (
                      <div className={`w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[idx % GRADIENT_COLORS.length]} text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg mb-5 sm:mb-6 group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 relative z-10`}>
                        {getInitials(member.full_name)}
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 relative z-10">{member.full_name}</h3>
                    <div className="inline-block bg-[#1e3a8a]/5 text-[#1e3a8a] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 relative z-10">
                      {member.role}
                    </div>

                    {member.quote && (
                      <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed italic mb-4 sm:mb-5 max-w-xs relative z-10">
                        «{member.quote}»
                      </p>
                    )}

                    <div className="mt-auto flex gap-2.5 relative z-10">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 text-[#0a66c2] rounded-full shadow-sm hover:shadow-md hover:bg-[#0a66c2] hover:text-white transition-all duration-300">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.telegram && (
                        <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 text-[#229ED9] rounded-full shadow-sm hover:shadow-md hover:bg-[#229ED9] hover:text-white transition-all duration-300">
                          <Send size={16} className="relative right-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {/* CTA Card */}
                <Link href="/vacancies" className="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-[#1e3a8a]/30 hover:-translate-y-1 transition-all duration-500 group cursor-pointer h-full">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-[#1e3a8a] flex items-center justify-center text-4xl sm:text-5xl md:text-6xl shadow-sm mb-5 sm:mb-6 group-hover:scale-105 transition-transform duration-500">
                    👋
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] mb-1">Возможно, это вы?</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed mb-4 sm:mb-5 mt-1 sm:mt-2 max-w-xs">
                    Присоединяйтесь к команде и меняйте мир к лучшему
                  </p>
                  <div className="mt-auto px-5 sm:px-6 py-2 sm:py-2.5 bg-[#ffca63]/20 text-[#1e3a8a] font-bold rounded-full text-sm group-hover:bg-[#ffca63] transition-colors duration-300">
                    Посмотреть вакансии
                  </div>
                </Link>
              </div>
            )}
          </div>
        </section>    


      </div>
    </MainLayout>
  );
}