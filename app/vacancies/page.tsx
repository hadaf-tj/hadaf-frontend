"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { fetchVacancies, Vacancy } from "@/lib/api";

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacancies()
      .then((data) => setVacancies(data || []))
      .catch(() => setVacancies([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="bg-[#f8fafc] w-full min-h-screen">
        <section className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-16 sm:pb-24 rounded-b-[2rem] sm:rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3">
              Присоединяйтесь к команде
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl">
              Станьте частью проекта «Ҳадаф» и помогайте нам развивать
              социальные инициативы в Таджикистане.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20 min-h-[50vh]">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#1e3a8a]">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-bold text-lg">Загрузка вакансий...</p>
              </div>
            ) : vacancies.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase size={64} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Пока нет открытых вакансий
                </h3>
                <p className="text-gray-500 max-w-md mx-auto font-medium">
                  Мы всегда рады талантам. Вы можете отправить резюме в наш
                  Telegram:{" "}
                  <Link
                    href="https:////t.me/hadaf_tajikistan"
                    className="text-blue-500 hover:underline"
                  >
                    @hadaf_tajikistan
                  </Link>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {vacancies.map((v) => (
                  <Link
                    href={`/vacancies/${v.id}`}
                    key={v.id}
                    className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:border-blue-100 hover:-translate-y-1 group flex flex-col h-full"
                  >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#1e3a8a] font-bold text-sm mb-4 border border-blue-100 self-start">
                      {v.type}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">
                      {v.title}
                    </h3>
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex items-center gap-2.5 text-gray-600 font-bold">
                        <MapPin
                          size={16}
                          className="text-[#229ED9] flex-shrink-0"
                        />{" "}
                        Удалённо
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-600 font-bold">
                        <Clock
                          size={16}
                          className="text-[#229ED9] flex-shrink-0"
                        />{" "}
                        {v.workload}
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-600 font-bold">
                        <Briefcase
                          size={16}
                          className="text-[#229ED9] flex-shrink-0"
                        />{" "}
                        {v.experience}
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-[#1e3a8a] font-bold text-sm group-hover:gap-3 transition-all">
                      Подробнее
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
