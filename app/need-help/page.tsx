import MainLayout from '@/components/layout/MainLayout';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NeedHelpPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-16 sm:pb-24 rounded-b-[2rem] sm:rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3">
              Нужна помощь?
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl">
              Этот раздел находится в разработке
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-[#1e3a8a]/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Clock size={40} className="text-[#1e3a8a]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                Совсем скоро
              </h2>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed mb-10">
                Мы активно работаем над созданием этого раздела. Здесь появится удобная форма 
                для оформления заявок на благотворительную помощь.
              </p>
              <Button asChild className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 px-8 rounded-full text-base">
                <Link href="/">Вернуться на главную</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
