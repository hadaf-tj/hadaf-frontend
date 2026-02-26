import MainLayout from '@/components/layout/MainLayout';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="bg-[#1e3a8a] pt-28 sm:pt-36 pb-8 sm:pb-12 rounded-b-[2rem] sm:rounded-b-[3rem]">
        <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">
            Отказ от ответственности
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Пользовательское соглашение и условия использования
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28 py-12 sm:py-20 max-w-4xl min-h-[50vh]">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-12 -mt-10 sm:-mt-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-[#ffca63] text-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-sm">
              <FileText size={32} />
            </div>
          </div>
          
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            <div className="bg-[#ffca63]/20 border border-[#ffca63] p-4 rounded-xl text-[#1e3a8a] font-medium mb-8 flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <p className="m-0">
                Внимание: Платформа «Ҳадаф» находится в стадии разработки (Beta-версия). Данный сайт является MVP (минимально жизнеспособным продуктом).
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">1. Статус платформы</h3>
            <p>
              Платформа является исключительно информационной и разработана группой волонтеров на безвозмездной основе для демонстрации концепции. Все упоминания учреждений, детских домов или их нужд в текущей версии являются <strong>выдуманными (демонстрационными)</strong> данными.
            </p>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">2. Финансовые операции</h3>
            <p>
              Мы <strong>не собираем</strong> финансовые пожертвования. Платформа не принимает, не обрабатывает и не осуществляет денежные переводы. Смысл концепции заключается в личной передаче необходимых вещей от волонтера напрямую в учреждение.
            </p>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">3. Ответственность</h3>
            <p>
              Администрация сайта не несет юридической или финансовой ответственности за точность информации, размещенной на сайте в период бета-тестирования, а также за любые действия пользователей. Нажимая кнопку «Помочь» в демо-версии, вы не берете на себя никаких реальных обязательств.
            </p>

            <p className="text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
              Если вы являетесь представителем реального учреждения и хотели бы стать нашим первым официальным партнером после полноценного запуска, пожалуйста, свяжитесь с нами через раздел Контакты.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
