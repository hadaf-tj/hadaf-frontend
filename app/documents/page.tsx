import MainLayout from '@/components/layout/MainLayout';
import { FolderArchive } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  return (
    <MainLayout>
      <div className="bg-[#1e3a8a] pt-28 sm:pt-36 pb-8 sm:pb-12 rounded-b-[2rem] sm:rounded-b-[3rem]">
        <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">
            Официальные документы
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Реестр документов проекта Ҳадаф
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28 py-16 sm:py-24 max-w-4xl min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-[#1e3a8a]/5 text-[#1e3a8a] rounded-[2rem] flex items-center justify-center mb-8 border border-[#1e3a8a]/20">
          <FolderArchive size={48} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black text-[#1e3a8a] mb-6">Документы в разработке</h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          В данный момент платформа «Ҳадаф» проходит стадию Beta-тестирования инициативной группой. Регистрация юридического лица, публикация уставов и официальных отчетов будет произведена перед полноценным официальным запуском проекта.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              href="/privacy" 
              className="px-6 py-3 bg-white border border-gray-200 text-[#1e3a8a] font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors w-full sm:w-auto"
            >
              Политика конфиденциальности
            </Link>
            <Link 
              href="/terms" 
              className="px-6 py-3 bg-white border border-gray-200 text-[#1e3a8a] font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors w-full sm:w-auto"
            >
              Отказ от ответственности
            </Link>
        </div>
      </div>
    </MainLayout>
  );
}
