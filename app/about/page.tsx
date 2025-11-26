import { Card } from '@/components/ui/Card';
import { Heart, Shield, Zap, Users, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#f7f9fe] min-h-screen pb-24 font-sans">
       
       {/* Hero Section */}
       <section className="bg-white pt-20 pb-24 rounded-b-[3rem] shadow-sm overflow-hidden relative">
          {/* Фон */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#f3e8ff] to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>
          
          <div className="container mx-auto max-w-4xl text-center px-4 relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f3e8ff] text-[#763f97] rounded-full text-sm font-bold mb-8">
                <span>✨</span> О проекте Пайванд
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold text-[#763f97] mb-8 leading-tight">
                Наша миссия — <br/> объединять сердца
             </h1>
             <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                «Пайванд» — это цифровой мост между теми, кто хочет помочь, и теми, кто в этом остро нуждается. Мы делаем благотворительность в Таджикистане прозрачной, адресной и эффективной.
             </p>
          </div>
       </section>

       {/* Ценности (Карточки) */}
       <section className="container mx-auto max-w-6xl px-4 mt-16">
          <h2 className="text-3xl font-bold text-[#304663] text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Value 1 */}
             <Card className="border-none shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-[#f3e8ff] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#763f97] group-hover:scale-110 transition-transform duration-300">
                   <Shield size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#304663] mb-4">Прозрачность</h3>
                <p className="text-gray-500 leading-relaxed">
                   Мы верифицируем каждое учреждение. Вы точно знаете, куда и кому идет ваша помощь, без скрытых процессов.
                </p>
             </Card>
             
             {/* Value 2 */}
             <Card className="border-none shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-[#fffbeb] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#ffca63] group-hover:scale-110 transition-transform duration-300">
                   <Heart size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#304663] mb-4">Забота</h3>
                <p className="text-gray-500 leading-relaxed">
                   Мы фокусируемся на самых уязвимых: детях-сиротах и пожилых людях, обеспечивая их не просто вещами, а вниманием.
                </p>
             </Card>

             {/* Value 3 */}
             <Card className="border-none shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all bg-white p-8 text-center group h-full">
                <div className="w-20 h-20 bg-[#ffeef2] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#f16722] group-hover:scale-110 transition-transform duration-300">
                   <Zap size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#304663] mb-4">Эффективность</h3>
                <p className="text-gray-500 leading-relaxed">
                   Платформа обновляется в реальном времени. Это помогает избежать дублирования помощи и закрывать самые срочные нужды.
                </p>
             </Card>
          </div>
       </section>

       {/* История / Текст */}
       <section className="container mx-auto max-w-6xl px-4 mt-24 mb-20">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl flex flex-col lg:flex-row items-center gap-16">
             <div className="flex-1 space-y-8">
                <div>
                   <div className="flex items-center gap-3 text-[#763f97] font-bold mb-4">
                      <Lightbulb size={24} />
                      <span className="uppercase tracking-wider text-sm">История</span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-extrabold text-[#304663]">Как всё началось</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                   Идея проекта родилась из простого наблюдения: многие люди хотят помочь детским домам, но часто привозят одни и те же вещи (например, конфеты на Новый год), в то время как учреждениям остро не хватает элементарных средств гигиены, одежды или бытовой химии.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                   Мы решили создать инструмент, который покажет реальную картину нужд. Так появился <b>«Пайванд»</b> (Связь) — проект, который соединяет людей, готовых помочь, с теми, кто ждет помощи.
                </p>
                
                <div className="pt-4 grid grid-cols-2 gap-6">
                   <div>
                      <div className="text-4xl font-bold text-[#763f97] mb-1">2025</div>
                      <div className="text-sm text-gray-400 uppercase font-bold">Год основания</div>
                   </div>
                   <div>
                      <div className="text-4xl font-bold text-[#ffca63] mb-1">10+</div>
                      <div className="text-sm text-gray-400 uppercase font-bold">Волонтеров в команде</div>
                   </div>
                </div>
             </div>
             
             {/* Блок с фото/заглушкой */}
             <div className="flex-1 w-full">
                 <div className="relative aspect-square bg-[#e9eff5] rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                       <Users size={64} className="text-[#763f97] mb-4 opacity-50" />
                       <span className="text-[#304663] font-bold text-xl">Команда волонтеров</span>
                       <span className="text-gray-500 mt-2">Мы работаем для вас</span>
                    </div>
                 </div>
             </div>
          </div>
       </section>
    </div>
  );
}