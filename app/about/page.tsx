// FILE: app/about/page.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { Heart, Shield, Zap, Users, Target, Lightbulb, Award, TrendingUp, Globe, Calendar, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  return (
   <MainLayout>
   <div className="bg-[#f7f9fe] min-h-screen pb-24 font-sans">
       
       {/* Hero Section */}
       <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#8b4fa8] to-[#5a2d7a]">
          {/* Фоновые элементы */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#ffca63]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#9851c2]/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full text-sm font-bold tracking-wider border border-white/30 text-white mb-8">
                <span>✨</span> О проекте Пайванд
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                Наша миссия — <br/> 
                <span className="bg-gradient-to-r from-[#ffca63] via-[#ffd685] to-[#ffca63] bg-clip-text text-transparent">
                  объединять сердца
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                «Пайванд» — это цифровой мост между теми, кто хочет помочь, и теми, кто в этом остро нуждается. Мы делаем благотворительность в Таджикистане прозрачной, адресной и эффективной.
              </p>
            </div>
          </div>
          
          {/* Волна-разделитель */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
       </section>

       {/* Ценности (Карточки) */}
       <section className="py-24 bg-white relative">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#304663] mb-6">
                Наши <span className="text-[#1e3a8a]">ценности</span>
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                Основные принципы, которые направляют каждое наше действие
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1e3a8a] to-[#9d5cb5] rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Shield size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#304663] mb-4">Прозрачность</h3>
                <p className="text-gray-800 leading-relaxed">
                   Мы верифицируем каждое учреждение. Вы точно знаете, куда и кому идет ваша помощь, без скрытых процессов.
                </p>
             </Card>
             
             {/* Value 2 */}
             <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ffca63] to-[#ffb74d] rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Heart size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#304663] mb-4">Забота</h3>
                <p className="text-gray-800 leading-relaxed">
                   Мы фокусируемся на самых уязвимых: детях-сиротах и пожилых людях, обеспечивая их не просто вещами, а вниманием.
                </p>
             </Card>

             {/* Value 3 */}
             <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#34d399] to-[#10b981] rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Zap size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#304663] mb-4">Эффективность</h3>
                <p className="text-gray-800 leading-relaxed">
                   Платформа обновляется в реальном времени. Это помогает избежать дублирования помощи и закрывать самые срочные нужды.
                </p>
             </Card>

             {/* Value 4 */}
             <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Globe size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#304663] mb-4">Доступность</h3>
                <p className="text-gray-800 leading-relaxed">
                   Мы делаем помощь простой и доступной для каждого. Любой человек может внести свой вклад, независимо от его возможностей.
                </p>
             </Card>
          </div>
         </div>
       </section>
       </div>

       {/* История / Текст */}
       <section className="py-24 bg-gradient-to-b from-white to-[#f7f9fe] relative">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col lg:flex-row items-center gap-16 border border-gray-100">
               <div className="flex-1 space-y-8">
                  <div>
                     <div className="flex items-center gap-3 text-[#1e3a8a] font-bold mb-4">
                        <Lightbulb size={24} />
                        <span className="uppercase tracking-wider text-sm">История создания</span>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-extrabold text-[#304663]">Как всё началось</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Идея проекта родилась из простого наблюдения: многие люди хотят помочь детским домам, но часто привозят одни и те же вещи (например, конфеты на Новый год), в то время как учреждениям остро не хватает элементарных средств гигиены, одежды или бытовой химии.
                    </p>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      Мы решили создать инструмент, который покажет реальную картину нужд. Так появился <span className="font-bold text-[#1e3a8a]">«Пайванд»</span> (Связь) — проект, который соединяет людей, готовых помочь, с теми, кто ждет помощи.
                    </p>
                  </div>
                  
                  <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                     <div className="text-center p-4 bg-[#f7f9fe] rounded-2xl">
                        <div className="text-3xl font-bold text-[#1e3a8a] mb-1">2025</div>
                        <div className="text-sm text-gray-500 uppercase font-bold">Год основания</div>
                     </div>
                     <div className="text-center p-4 bg-[#f7f9fe] rounded-2xl">
                        <div className="text-3xl font-bold text-[#ffca63] mb-1">10+</div>
                        <div className="text-sm text-gray-500 uppercase font-bold">Волонтеров</div>
                     </div>
                     <div className="text-center p-4 bg-[#f7f9fe] rounded-2xl">
                        <div className="text-3xl font-bold text-[#1e3a8a] mb-1">271</div>
                        <div className="text-sm text-gray-500 uppercase font-bold">Учреждений</div>
                     </div>
                     <div className="text-center p-4 bg-[#f7f9fe] rounded-2xl">
                        <div className="text-3xl font-bold text-[#ffca63] mb-1">1088+</div>
                        <div className="text-sm text-gray-500 uppercase font-bold">Закрытых нужд</div>
                     </div>
                  </div>
               </div>
               
               {/* Изображение */}
               <div className="flex-1 w-full relative group">
                   <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1e3a8a] to-[#9d5cb5] rounded-[2rem] overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                         <Users size={80} className="text-white/30 mb-6" />
                         <span className="text-white text-2xl font-bold mb-2">Команда волонтеров</span>
                         <span className="text-white/70 text-lg">Мы работаем для вас</span>
                         
                         {/* Декоративные элементы */}
                         <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                         <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#ffca63]/20 rounded-full blur-xl"></div>
                      </div>
                   </div>
                   
                   {/* Акцентный элемент */}
                   <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ffca63] to-[#ffb74d] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <Award size={48} className="text-white" />
                   </div>
               </div>
            </div>
          </div>
       </section>

       {/* Команда */}
       <section className="py-24 bg-white relative">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#304663] mb-6">
                Наша <span className="text-[#1e3a8a]">команда</span>
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                Профессионалы и волонтеры, которые каждый день работают над тем, чтобы помощь приходила вовремя
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Алишер К.', role: 'Основатель проекта', desc: 'Инициатор создания платформы' },
                { name: 'Малика Р.', role: 'Координатор волонтеров', desc: 'Организует помощь на местах' },
                { name: 'Джамшед Т.', role: 'Технический директор', desc: 'Разработка и поддержка платформы' },
                { name: 'Фируза С.', role: 'PR-менеджер', desc: 'Работа с партнерами и СМИ' },
                { name: 'Самир Х.', role: 'Логист', desc: 'Организация доставки помощи' },
                { name: 'Волонтеры', role: 'Наша основа', desc: 'Более 10 активных помощников' },
              ].map((member, idx) => (
                <Card key={idx} className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white p-8 text-center group">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#1e3a8a] to-[#9d5cb5] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-[#304663] mb-2">{member.name}</h3>
                  <div className="text-[#1e3a8a] font-bold mb-3">{member.role}</div>
                  <p className="text-gray-800 text-sm">{member.desc}</p>
                </Card>
              ))}
            </div>
          </div>
       </section>

       {/* Контактная информация */}
       <section className="py-24 bg-gradient-to-b from-white to-[#f7f9fe] relative">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#304663] mb-6">
                  Контакты
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  Свяжитесь с нами, если у вас есть вопросы или предложения
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-[#f7f9fe] rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1e3a8a] to-[#9d5cb5] rounded-full flex items-center justify-center text-white">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#304663] mb-2">Адрес</h3>
                  <p className="text-gray-800">Душанбе, Таджикистан<br/>пр. Рудаки, 100</p>
                </div>
                
                <div className="text-center p-6 bg-[#f7f9fe] rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#ffca63] to-[#ffb74d] rounded-full flex items-center justify-center text-white">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#304663] mb-2">Время работы</h3>
                  <p className="text-gray-800">Пн-Пт: 9:00-18:00<br/>Сб: 10:00-16:00</p>
                </div>
                
                <div className="text-center p-6 bg-[#f7f9fe] rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#34d399] to-[#10b981] rounded-full flex items-center justify-center text-white">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#304663] mb-2">Стать волонтером</h3>
                  <p className="text-gray-800">Присоединяйтесь к нашей команде волонтеров</p>
                  <a href="#" className="inline-block mt-4 text-[#1e3a8a] font-bold hover:underline">
                    Заполнить анкету →
                  </a>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-gray-200 text-center">
                <p className="text-gray-800 mb-6">
                  Если вы представляете социальное учреждение и хотите присоединиться к платформе, напишите нам на:
                </p>
                <a href="mailto:partners@payvand.tj" className="text-2xl font-bold text-[#1e3a8a] hover:underline">
                  partners@payvand.tj
                </a>
              </div>
            </div>
          </div>
       </section>

    </MainLayout>
  );
}