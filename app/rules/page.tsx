// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: app/rules/page.tsx */
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RulesPage() {
  const t = useTranslations("rules");
  const allowedRules = t.raw("allowedRules") as string[];
  const forbiddenRules = t.raw("forbiddenRules") as string[];
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        {/* HERO */}
        <div className="bg-[#1e3a8a] pt-24 pb-16 rounded-b-[3rem] text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-black text-white mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ЧТО МОЖНО */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">
                {t("allowedTitle")}
              </h2>
            </div>
            <ul className="space-y-4">
              {allowedRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-500 shrink-0 mt-1"
                    size={18}
                  />
                  <span className="text-gray-700 font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ЧТО НЕЛЬЗЯ */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-red-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <XCircle size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">{t("forbiddenTitle")}</h2>
            </div>
            <ul className="space-y-4">
              {forbiddenRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="text-red-500 shrink-0 mt-1" size={18} />
                  <span className="text-gray-700 font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Важно */}
        <div className="container mx-auto max-w-5xl px-6 mt-8">
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
            <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-orange-800 text-lg mb-1">
                {t("importantTitle")}
              </h3>
              <p className="text-orange-700/80 leading-relaxed">
                {t("importantText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
