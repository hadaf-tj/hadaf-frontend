/* FILE: app/not-found.tsx */
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#1e3a8a]">
      {/* Подключаем Хедер, чтобы человек мог уйти через меню */}
      <Header variant="colored" />
      
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 py-24 lg:gap-16 max-w-7xl mx-auto w-full">
        
        {/* ЛЕВАЯ ЧАСТЬ: Изображение */}
        <div className="flex-shrink-0 mb-10 lg:mb-0 relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
           {/* Декоративный круг на фоне (еле заметный) */}
           <div className="absolute inset-0 bg-blue-50 rounded-full scale-90 -z-10"></div>
           
           <Image
             src="/404.webp" // Используем сгенерированное фото
             alt="Заблудившийся волонтер"
             fill
             className="object-contain"
             priority
           />
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Текст и кнопка */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
          
          <div className="inline-block px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            Ошибка 404
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#1e3a8a] mb-6 leading-tight">
            Роҳгум задем? <br/>
            <span className="text-gray-300 text-2xl md:text-4xl">(Заблудились?)</span>
          </h1>

          <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
            Похоже, мы свернули не на ту улицу. Такой страницы не существует, или она переехала в другой район.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild className="h-14 bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold text-lg px-8 rounded-2xl shadow-xl shadow-blue-900/10">
              <Link href="/">
                <Home size={20} className="mr-2" />
                На главную
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-14 border-2 border-gray-100 text-gray-500 hover:text-[#1e3a8a] hover:border-[#1e3a8a] font-bold text-lg px-8 rounded-2xl bg-transparent">
              <Link href="/institutions">
                 <ArrowLeft size={20} className="mr-2" />
                 Вернуться назад
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}