"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchVacancyById, Vacancy } from "@/lib/api";

export default function VacancyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Number(params.id);
    if (!id) return;
    fetchVacancyById(id)
      .then(setVacancy)
      .catch(() => setVacancy(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-16 sm:pb-24 rounded-b-[2rem] sm:rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <button
              onClick={() => router.push("/vacancies")}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Все вакансии
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white">
              {vacancy?.title || "Вакансия"}
            </h1>
          </div>
        </div>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#1e3a8a]">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-bold text-lg">Загрузка...</p>
              </div>
            ) : !vacancy ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Вакансия не найдена
                </h3>
                <button
                  onClick={() => router.push("/vacancies")}
                  className="text-[#1e3a8a] font-bold hover:underline mt-4"
                >
                  Вернуться к вакансиям
                </button>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto -mt-10 sm:-mt-16">
                <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm">
                  {/* Tag + meta */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#1e3a8a] font-bold text-sm border border-blue-100">
                      {vacancy.type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 bg-[#f8fafc] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-700 font-bold">
                      <MapPin
                        size={20}
                        className="text-[#229ED9] flex-shrink-0"
                      />{" "}
                      Удалённо
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 font-bold">
                      <Clock
                        size={20}
                        className="text-[#229ED9] flex-shrink-0"
                      />{" "}
                      {vacancy.workload}
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 font-bold">
                      <Briefcase
                        size={20}
                        className="text-[#229ED9] flex-shrink-0"
                      />{" "}
                      {vacancy.experience}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-black text-gray-900 mb-4">
                      Описание
                    </h3>
                    <div className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                      {vacancy.description}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <Button
                      asChild
                      className="w-full sm:w-auto bg-[#ffca63] hover:bg-[#ffe199] text-[#1e3a8a] font-black h-14 px-10 rounded-full text-lg group"
                    >
                      <Link
                        href="https:////t.me/hadaf_tajikistan"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Откликнуться в Telegram
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
