"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import MainLayout from "@/components/layout/MainLayout";
import { FileText, Construction } from "lucide-react";

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        {/* HERO HEADER */}
        <div className="bg-[#1e3a8a] pb-24 pt-24 relative overflow-hidden rounded-b-[3rem]">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-[url('/ornament.webp')] bg-repeat mix-blend-overlay"></div>
          </div>

          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              Отчеты и показатели
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Раздел финансовой прозрачности
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-20 -mt-16">
          <div className="bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-[#ffca63]/20 rounded-full flex items-center justify-center">
              <Construction size={48} className="text-[#ffca63]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-[#1e3a8a] mb-4">
              Раздел в разработке
            </h2>

            <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              На данный момент отчётов нет, так как проект находится в стадии
              активной разработки. Как только платформа начнёт работу, здесь
              будут публиковаться подробные отчёты.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-[#1e3a8a] font-medium text-sm">
              <FileText size={16} />
              Следите за обновлениями
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
