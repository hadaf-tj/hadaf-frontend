import MainLayout from '@/components/layout/MainLayout';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="bg-[#1e3a8a] pt-28 sm:pt-36 pb-8 sm:pb-12 rounded-b-[2rem] sm:rounded-b-[3rem]">
        <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">
            Политика конфиденциальности
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Узнайте, как мы обрабатываем ваши данные на этапе MVP
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-28 py-12 sm:py-20 max-w-4xl min-h-[50vh]">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-12 -mt-10 sm:-mt-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-[#ffca63] text-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-sm">
              <ShieldAlert size={32} />
            </div>
          </div>
          
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            <div className="bg-[#ffca63]/20 border border-[#ffca63] p-4 rounded-xl text-[#1e3a8a] font-medium mb-8 flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <p className="m-0">
                Внимание: Платформа «Ҳадаф» находится в стадии Beta-тестирования. Учреждения и нужды в каталоге представлены исключительно для демонстрации работы системы.
              </p>
            </div>

            <p>
              Ваша конфиденциальность очень важна для нас. Данная политика описывает, как мы обрабатываем ваши данные на этапе MVP (минимально жизнеспособного продукта).
            </p>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">Какие данные мы собираем</h3>
            <p>
              Мы собираем ваш email и имя исключительно для создания учетной записи (личного кабинета), чтобы вы могли тестировать функционал платформы и отслеживать историю своих обещаний (помощи). 
            </p>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">Как мы используем ваши данные</h3>
            <p>
              Ваши данные используются <strong>только</strong> для авторизации на платформе. Мы не передаем ваши личные данные третьим лицам, рекламным сетям или сторонним сервисам. 
            </p>
            
            <h3 className="text-xl font-bold text-[#1e3a8a] mt-8 mb-4">Удаление данных</h3>
            <p>
              Так как сайт работает в тестовом режиме, база данных может периодически очищаться, а ваша учетная запись может быть удалена в любой момент. Если вы хотите удалить свои данные немедленно, вы можете сделать это в настройках профиля или связавшись с нами.
            </p>

            <p className="text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
              Регистрируясь на платформе, вы соглашаетесь с вышеописанными условиями обработки данных в рамках Beta-тестирования.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}