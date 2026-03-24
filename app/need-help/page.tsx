import MainLayout from '@/components/layout/MainLayout';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NeedHelpPage() {
  return (
    <MainLayout>
      {/* Header section with deep blue and ornaments */}
      <div className="relative bg-[#1e3a8a] pt-28 sm:pt-36 pb-12 sm:pb-24 rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden">
        {/* Ambient ornaments */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/[0.05] to-transparent rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffca63]/[0.08] rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#ffca63] rounded-full"></div>
              <span className="text-[#ffca63] font-bold text-sm uppercase tracking-[0.15em]">Запрос поддержки</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1]">
              Нужна <br />
              <span className="text-[#ffca63]">помощь?</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              Мы создаем платформу, чтобы каждый нуждающийся мог быть услышан.
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-white min-h-[60vh] overflow-hidden flex items-center">
        {/* Subtle background ornaments */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1e3a8a]/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 border border-gray-100 rounded-[2.5rem] mb-10 shadow-sm relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Clock size={44} className="text-[#1e3a8a] relative z-10" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e3a8a] mb-6 font-display">Раздел в разработке</h2>
            
            <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed mb-12">
              Мы активно работаем над функционалом для прямой подачи заявок от граждан и социальных учреждений. Совсем скоро здесь появится удобная форма для верифицированных запросов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button asChild className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-black h-14 px-10 rounded-2xl text-base shadow-xl shadow-[#1e3a8a]/20 w-full sm:w-auto transition-all hover:scale-[1.02]">
                <Link href="/">Вернуться на главную</Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 font-black h-14 px-10 rounded-2xl text-base w-full sm:w-auto">
                <Link href="/contacts">Связаться с нами</Link>
              </Button>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Ҳадаф — Прозрачная помощь</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
