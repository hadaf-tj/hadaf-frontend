// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: app/contacts/page.tsx */
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Send, MessageCircle, Linkedin, Instagram } from "lucide-react";

export default function ContactsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen font-sans bg-[#f8fafc]">
        {/* HERO HEADER */}
        <div className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-10 sm:pb-16 rounded-b-[2rem] sm:rounded-b-[3rem] text-center relative overflow-hidden">
          <div className="container mx-auto px-5 sm:px-6 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
              Свяжитесь с нами
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Мы всегда рады ответить на ваши вопросы, предложения и идеи.
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-10 sm:py-16">
          <div className="space-y-8">
            {/* Объяснение об онлайн-формате */}
            <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">
                Мы работаем полностью онлайн
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                На этапе Beta-тестирования платформы у проекта «Ҳадаф» нет
                физического офиса или складов для приёма вещей. Платформа
                призвана напрямую связывать волонтеров с учреждениями. По всем
                вопросам сотрудничества и технической поддержки пишите нам
                онлайн — мы на связи!
              </p>
            </div>

            {/* 3 Social cards — full width grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Instagram */}
              <a
                href="https:////www.instagram.com/hadaf_tajikistan/"
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-none group"
              >
                <div className="bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Instagram size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Instagram
                  </h3>
                  <p className="text-white/85 font-medium text-sm sm:text-base leading-relaxed mb-5">
                    Посты, истории и публикации о нашей деятельности.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white text-[#DD2A7B] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-md">
                    <Instagram size={18} />
                    Подписаться
                  </div>
                </div>
              </a>

              {/* Telegram — центральный, главный */}
              <a
                href="https:////t.me/hadaf_tajikistan"
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-none group"
              >
                <div className="bg-gradient-to-br from-[#229ED9] to-[#1E88E5] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col items-center justify-center ring-2 ring-[#229ED9]/30 ring-offset-2 ring-offset-[#f8fafc]">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <MessageCircle
                      size={32}
                      className="text-white fill-white"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Telegram
                  </h3>
                  <p className="text-white/85 font-medium text-sm sm:text-base leading-relaxed mb-5">
                    Главный источник новостей и прямая связь с командой.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white text-[#229ED9] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-md">
                    <Send size={18} className="relative right-0.5" />
                    Подписаться
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https:////www.linkedin.com/company/hadaftajikistan/"
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-none group"
              >
                <div className="bg-gradient-to-br from-[#0a66c2] to-[#004182] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Linkedin size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    LinkedIn
                  </h3>
                  <p className="text-white/85 font-medium text-sm sm:text-base leading-relaxed mb-5">
                    Для профессионального сообщества и партнёров.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white text-[#0a66c2] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-md">
                    <Linkedin size={18} />
                    Подписаться
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
