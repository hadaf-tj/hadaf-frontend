"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import {
  HeartHandshake,
  Send,
  ArrowRight,
  Heart,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "institutions", href: "/institutions" },
  { key: "events", href: "/events" },
  { key: "vacancies", href: "/vacancies" },
  { key: "faq", href: "/faq" },
  { key: "contacts", href: "/contacts" },
] as const;

const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1e3a8a] text-white overflow-hidden">
      {/* Анимированный фон (можно добавить svg или градиенты, если нужно) */}

      <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-fixed bg-repeat bg-[length:300px] opacity-[0.08] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2557]/60 via-transparent to-[#1e3a8a]/40 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#ffca63]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      {/* Основной контент футера */}
      {/* ИЗМЕНЕНИЕ: Те же настройки контейнера для вертикального ритма */}
      <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-10 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          <div className="space-y-6 sm:space-y-8 lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-black text-white group"
            >
              <div className="relative">
                <div className="relative bg-white text-[#1e3a8a] p-3 rounded-2xl shadow-xl">
                  <HeartHandshake size={28} />
                </div>
              </div>
              <span className="bg-white bg-clip-text text-transparent">
                Ҳадаф
              </span>
            </Link>

            <p className="text-base text-white/80 leading-relaxed">
              {t("description")}
            </p>

            <div className="pt-2">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Навигация + Контакты: рядом на мобильном */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-12">
              {/* Навигация */}
              <div>
                <h3 className="font-black text-lg sm:text-xl mb-4 sm:mb-8 text-white/95">
                  {t("navigation")}
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-white transition-all flex items-center gap-2 group font-medium"
                      >
                        <ArrowRight
                          size={16}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ffca63]"
                        />
                        {tNav(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Контакты */}
              <div>
                <h3 className="font-black text-lg sm:text-xl mb-4 sm:mb-8 text-white/95">
                  {t("contacts")}
                </h3>
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
                  <a
                    href="https:////t.me/hadaf_tajikistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#229ED9]/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#229ED9]/40 transition-all border border-[#229ED9]/30">
                      <Send
                        size={18}
                        className="text-white relative right-0.5"
                      />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#ffca63] transition-colors">
                      Telegram
                    </span>
                  </a>

                  <a
                    href="https:////www.linkedin.com/company/hadaftajikistan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0a66c2]/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0a66c2]/40 transition-all border border-[#0a66c2]/30">
                      <Linkedin size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#ffca63] transition-colors">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href="https:////www.instagram.com/hadaf_tajikistan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-pink-500/30">
                      <Instagram size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#ffca63] transition-colors">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоса - улучшенная */}
        <div className="mt-10 sm:mt-16 md:mt-20 pt-6 sm:pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm font-medium mb-2">
                {t("copyright", { year })}
              </p>
              <p className="text-white/40 text-xs">
                {t.rich("madeWith", {
                  heart: () => (
                    <Heart
                      size={12}
                      className="inline text-red-400 animate-pulse mx-1"
                    />
                  ),
                })}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white transition-colors font-medium"
              >
                {t("privacy")}
              </Link>
              <span className="text-white/20">•</span>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white transition-colors font-medium"
              >
                {t("terms")}
              </Link>
              <span className="text-white/20">•</span>
              <Link
                href="/documents"
                className="text-white/60 hover:text-white transition-colors font-medium"
              >
                {t("documents")}
              </Link>
              <span className="text-white/20">•</span>
              <a
                href="https:////github.com/hadaf-tj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/60 hover:text-white transition-colors font-medium"
                title={t("sourceCodeTitle")}
              >
                <Github size={14} className="mr-1.5" />
                <span>{t("sourceCode")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
