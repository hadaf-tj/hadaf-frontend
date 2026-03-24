import MainLayout from '@/components/layout/MainLayout';
import { FolderArchive, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  return (
    <MainLayout>
      {/* Header section with deep blue and ornaments */}
      <div className="relative bg-[#1e3a8a] pt-28 sm:pt-36 pb-12 sm:pb-20 rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden">
        {/* Ambient ornaments */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/[0.05] to-transparent rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffca63]/[0.08] rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#ffca63] rounded-full"></div>
              <span className="text-[#ffca63] font-bold text-sm uppercase tracking-[0.15em]">Прозрачность</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1]">
              Официальные <br />
              <span className="text-[#ffca63]">документы</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              Реестр документов и правовых основ платформы Ҳадаф.
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-white min-h-[60vh] overflow-hidden">
        {/* Subtle background ornaments */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#1e3a8a]/[0.02] to-transparent rounded-full blur-[120px] translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#ffca63]/[0.03] rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            
            {/* Sidebar info */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm">
                  <div className="w-14 h-14 bg-white text-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200/50 mb-6">
                    <FolderArchive size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#1e3a8a] mb-4">Статус реестра</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1e3a8a]/5 border-l-4 border-[#1e3a8a] p-4 rounded-r-xl">
                      <p className="text-sm text-[#1e3a8a] font-bold leading-relaxed">
                        Все документы находятся в статусе "Проект" или "В разработке".
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      Официальная регистрация документов произойдет после завершения этапа тестирования и согласования с государственными структурами.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-2 inline-flex items-center gap-3 bg-[#1e3a8a]/5 rounded-full">
                  <div className="w-2 h-2 bg-[#ffca63] rounded-full"></div>
                  <span className="text-[#1e3a8a] font-bold text-xs uppercase tracking-wider">Обновлено: 24.03.2026</span>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-slate max-w-none">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-0 mb-6 font-display">Документация MVP</h3>
                <p className="text-gray-600 leading-relaxed sm:text-lg">
                  В данный момент платформа «Ҳадаф» проходит стадию Beta-тестирования инициативной группой. Мы работаем над созданием полноценной юридической базы, которая будет включать устав, официальные разрешения и отчеты о деятельности.
                </p>

                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent my-10"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <Link 
                    href="/privacy" 
                    className="group p-8 bg-gray-50 border border-gray-100 rounded-3xl hover:bg-white hover:border-[#1e3a8a]/20 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1e3a8a] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <ChevronRight size={24} />
                    </div>
                    <h4 className="text-lg font-black text-[#1e3a8a] mb-2">Политика безопасности</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Как мы защищаем ваши данные на этапе беты.</p>
                  </Link>

                  <Link 
                    href="/terms" 
                    className="group p-8 bg-gray-50 border border-gray-100 rounded-3xl hover:bg-white hover:border-[#ffca63]/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#ffca63] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <ChevronRight size={24} />
                    </div>
                    <h4 className="text-lg font-black text-[#1e3a8a] mb-2">Отказ от ответственности</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Важные правила и ограничения тестового периода.</p>
                  </Link>
                </div>

                <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 rounded-3xl p-8 sm:p-10">
                  <h4 className="text-xl font-black text-[#1e3a8a] mb-4">Будущие публикации</h4>
                  <ul className="space-y-4 list-none pl-0 font-medium">
                    {[
                      'Устав благотворительного фонда',
                      'Официальные разрешения от регуляторов',
                      'Шаблоны договоров с учреждениями',
                      'Ежемесячные финансовые отчеты',
                    ].map((item, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-500 text-sm sm:text-base border-b border-gray-50 sm:border-0 pb-4 sm:pb-0 mb-4 sm:mb-0 last:border-0 last:mb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                          <span className="font-medium text-[#1e3a8a]/80 sm:text-gray-500">{item}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest bg-gray-100 sm:bg-gray-200 text-gray-400 sm:text-gray-500 px-3 py-1.5 sm:py-0.5 rounded-lg sm:rounded-full sm:ml-auto w-full sm:w-auto text-center">В разработке</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
