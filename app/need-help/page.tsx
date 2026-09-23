// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import MainLayout from "@/components/layout/MainLayout";
import { Clock } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NeedHelpPage() {
  const t = await getTranslations("needHelp");

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
              <span className="text-[#ffca63] font-bold text-sm uppercase tracking-[0.15em]">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1]">
              {t.rich("heroTitle", {
                br: () => <br />,
                highlight: (chunks) => (
                  <span className="text-[#ffca63]">{chunks}</span>
                ),
              })}
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-white min-h-[60vh] overflow-hidden flex items-center">
        {/* Subtle background ornaments */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1e3a8a]/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e3a8a] mb-6 font-display">
              {t("applyTitle")}
            </h2>

            <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed mb-12">
              {t("applyText")}
            </p>

            <div className="flex flex-col gap-4 items-center justify-center">
              {/* Main action */}
              <Button
                asChild
                className="bg-[#ffca63] text-[#1e3a8a] hover:bg-[#ffd98a] font-black h-16 px-14 rounded-2xl text-lg shadow-xl shadow-[#ffca63]/30 w-full sm:w-auto transition-all hover:scale-[1.03]"
              >
                <Link href="/need-help/apply">{t("applyButton")}</Link>
              </Button>

              {/* Secondary actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <Button
                  asChild
                  className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-14 px-8 rounded-2xl text-base shadow-lg shadow-[#1e3a8a]/15 w-full sm:w-auto transition-all hover:scale-[1.02]"
                >
                  <Link href="/">{t("backHomeButton")}</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 font-bold h-14 px-8 rounded-2xl text-base w-full sm:w-auto"
                >
                  <Link href="/contacts">{t("contactButton")}</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                {t("tagline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
