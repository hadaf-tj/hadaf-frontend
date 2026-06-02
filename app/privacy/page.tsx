// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import MainLayout from "@/components/layout/MainLayout";
import { ShieldAlert } from "lucide-react";

export default function PrivacyPage() {
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
              <span className="text-[#ffca63] font-bold text-sm uppercase tracking-[0.15em]">
                Конфиденциальность
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1]">
              Политика <br />
              <span className="text-[#ffca63]">безопасности</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              Ваша приватность — наш приоритет. Узнайте, как мы работаем с
              данными на этапе MVP.
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-white min-h-screen overflow-hidden">
        {/* Subtle background ornaments for the main content area */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#1e3a8a]/[0.02] to-transparent rounded-full blur-[120px] translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#ffca63]/[0.03] rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            {/* Sidebar info */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm">
                  <div className="w-14 h-14 bg-white text-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200/50 mb-6">
                    <ShieldAlert size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#1e3a8a] mb-4">
                    Безопасность Beta-версии
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[#ffca63]/15 border-l-4 border-[#ffca63] p-4 rounded-r-xl">
                      <p className="text-sm text-[#1e3a8a] font-bold leading-relaxed">
                        Платформа «Ҳадаф» находится в стадии разработки. Все
                        данные в каталоге являются демонстрационными.
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      Мы используем современные протоколы шифрования и лучшие
                      практики защиты даже в тестовом режиме.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-2 inline-flex items-center gap-3 bg-[#1e3a8a]/5 rounded-full">
                  <div className="w-2 h-2 bg-[#1e3a8a] rounded-full animate-pulse"></div>
                  <span className="text-[#1e3a8a] font-bold text-xs uppercase tracking-wider">
                    Последнее обновление: 24.03.2026
                  </span>
                </div>
              </div>
            </div>

            {/* Main content area (wider) */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-slate max-w-none">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-0 mb-6">
                  Основные положения
                </h3>
                <p className="text-gray-600 leading-relaxed sm:text-lg">
                  Ваша конфиденциальность очень важна для нас. Данная политика
                  описывает, как мы обрабатываем ваши данные на этапе MVP
                  (минимально жизнеспособного продукта). Прозрачность — в основе
                  нашего проекта.
                </p>

                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent my-10"></div>

                <h4 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                  1. Какие данные мы собираем
                </h4>
                <p className="text-gray-600 mb-8 sm:text-lg">
                  Мы собираем ваш <strong>номер телефона, имя и почту</strong>{" "}
                  исключительно для создания учетной записи (личного кабинета),
                  чтобы вы могли тестировать функционал платформы и отслеживать
                  историю своих обещаний (помощи).
                </p>

                <h4 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                  2. Как мы используем ваши данные
                </h4>
                <p className="text-gray-600 mb-8 sm:text-lg">
                  Ваши данные используются <strong>только</strong> для
                  авторизации на платформе. Мы гарантируем, что:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3 text-gray-600 sm:text-lg">
                    <div className="w-6 h-6 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#1e3a8a]"></div>
                    </div>
                    <span>Данные не передаются рекламным сетям.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 sm:text-lg">
                    <div className="w-6 h-6 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#1e3a8a]"></div>
                    </div>
                    <span>
                      Информация не используется для сторонних рассылок.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 sm:text-lg">
                    <div className="w-6 h-6 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#1e3a8a]"></div>
                    </div>
                    <span>
                      Ваш профиль доступен только вам и администрации проекта в
                      рамках модерации.
                    </span>
                  </li>
                </ul>

                <h4 className="text-xl font-black text-gray-900 mt-12 mb-4 uppercase tracking-tight">
                  3. Удаление данных
                </h4>
                <p className="text-gray-600 mb-10 sm:text-lg">
                  Так как сайт работает в тестовом режиме, база данных может
                  периодически очищаться. Если вы хотите удалить свои данные
                  немедленно, вы можете сделать это в настройках профиля или
                  связавшись с нами в секции контактов.
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-10 mt-16">
                  <p className="text-gray-500 text-sm sm:text-base italic m-0 font-medium">
                    Регистрируясь на платформе, вы соглашаетесь с вышеописанными
                    условиями обработки данных в рамках Beta-тестирования
                    проекта «Ҳадаф».
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
