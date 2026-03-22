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

  useEffect(() => {
    fetchTeamMembers()
      .then(data => setMembers(data || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="font-sans overflow-hidden bg-[#f8fafc]">

        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[350px] sm:h-[400px] lg:h-[500px]">
          <Image
            src="/hero_about.webp"
            alt="About Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/90 to-[#1e3a8a]/40"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
              <div className="max-w-3xl space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-10 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-bold border border-white/20">
                  <Users size={16} className="text-[#ffca63]" />
                  О проекте
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Мы строим мост <br />
                  <span className="text-[#ffca63]">доверия и помощи</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl">
                  Ҳадаф — это платформа, объединяющая тех, кто хочет помочь, с проверенными государственными учреждениями: детскими домами и домами престарелых.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ИСТОРИЯ И ПРОБЛЕМА */}
        <section className="py-7 bg-white relative z-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-20">
              <div className="flex-1 space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1e3a8a] leading-tight">
                  Почему мы <br />
                  появились?
                </h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
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

              <div className="flex-1 relative w-full h-[280px] sm:h-[350px] lg:h-[500px]">
                <div className="absolute inset-0 bg-[#1e3a8a] rounded-2xl sm:rounded-[3rem] rotate-3 transform translate-x-4 translate-y-4 opacity-10"></div>
                <div className="relative h-full w-full rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
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

        {/* 4. КОМАНДА */}
        <section className="py-12 sm:py-20 lg:py-24 bg-white relative z-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1e3a8a] mb-4 sm:mb-6">
                Команда Ҳадаф
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Люди, которые создали и продолжают развивать эту платформу. Мы объединились ради общей идеи прозрачной благотворительности.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#1e3a8a]">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-bold text-lg">Загрузка...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {members.map((member, idx) => (
                  <div key={member.id} className="bg-[#f8fafc] border border-gray-100/50 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-blue-100 transition-all duration-300 group h-full">
                    {member.photo_url ? (
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-white ring-2 ring-gray-100">
                        <Image src={member.photo_url} alt={member.full_name} width={144} height={144} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[idx % GRADIENT_COLORS.length]} text-white flex items-center justify-center text-4xl font-black shadow-lg mb-6`}>
                        {getInitials(member.full_name)}
                      </div>
                    )}
                    <h3 className="text-xl font-black text-gray-900 mb-1">{member.full_name}</h3>
                    <div className="inline-block bg-[#1e3a8a]/5 text-[#1e3a8a] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                      {member.role}
                    </div>

                    {member.quote && (
                      <p className="text-gray-500 text-sm font-medium leading-relaxed italic mb-5 max-w-xs">
                        «{member.quote}»
                      </p>
                    )}

                    <div className="mt-auto flex gap-2.5">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 bg-white text-[#0a66c2] rounded-full shadow-sm hover:shadow-md hover:bg-[#0a66c2] hover:text-white transition-all">
                          <Linkedin size={19} />
                        </a>
                      )}
                      {member.telegram && (
                        <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 bg-white text-[#229ED9] rounded-full shadow-sm hover:shadow-md hover:bg-[#229ED9] hover:text-white transition-all">
                          <Send size={17} className="relative right-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {/* CTA Card */}
                <Link href="/vacancies" className="bg-white border-2 border-dashed border-blue-300 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-[#1e3a8a] flex items-center justify-center text-5xl sm:text-6xl shadow-sm mb-6 group-hover:scale-105 transition-transform duration-500">
                    👋
                  </div>
                  <h3 className="text-xl font-black text-[#1e3a8a] mb-1">Возможно, это вы?</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-5 mt-2 max-w-xs">
                    Присоединяйтесь к команде и меняйте мир к лучшему
                  </p>
                  <div className="mt-auto px-6 py-2.5 bg-[#ffca63]/20 text-[#1e3a8a] font-bold rounded-full group-hover:bg-[#ffca63] transition-colors">
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