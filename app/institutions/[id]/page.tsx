"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";

import {
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  ChevronLeft,
  Share2,
  Loader2,
  Clock,
  ShieldX,
  PackageCheck,
} from "lucide-react";
import { fetchInstitutionById } from "@/lib/api";
import { Institution } from "@/types/project";

export default function InstitutionDetailPage() {
  const t = useTranslations("institutionDetail");
  const params = useParams();

  const [data, setData] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetail = async () => {
      if (!params.id) return;

      setIsLoading(true);
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const result = await fetchInstitutionById(id);

        if (!result) {
          setError(t("notFound"));
        } else {
          setData(result);
        }
      } catch (err) {
        console.error(err);
        setError(t("loadError"));
      } finally {
        setIsLoading(false);
      }
    };

    loadDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-[#1e3a8a]">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-bold">{t("loadingProfile")}</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t("oops")}
          </h1>
          <p className="text-gray-500 mb-6">{error || t("notFound")}</p>
          <Button asChild>
            <Link href="/institutions">{t("backToList")}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const prohibitedItems = data.prohibitedItems
    ? data.prohibitedItems.split("\n").filter((item) => item.trim())
    : [];
  const recommendedItems = data.recommendedItems
    ? data.recommendedItems.split("\n").filter((item) => item.trim())
    : [];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        {/* HERO IMAGE & BREADCRUMBS */}
        <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden">
          <Image
            src="/institution_id_hero.webp"
            alt={data.name}
            fill
            className="object-cover"
            priority
          />

          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 pt-28">
            <Link
              href="/institutions"
              className="inline-flex items-center text-white hover:text-white transition-colors font-bold text-sm bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/30"
            >
              <ChevronLeft size={16} className="mr-1" />
              {t("backToListShort")}
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-10 lg:-mt-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ЛЕВАЯ КОЛОНКА */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center">
                    <Users size={32} />
                  </div>
                  {/* Verified пока хардкодим true, или добавим поле в БД */}
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    {t("verified")}
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
                  {data.name}
                </h1>

                <div className="flex items-center text-gray-500 font-medium mb-6">
                  <MapPin size={16} className="mr-2 text-[#ffca63]" />
                  {data.city}, {data.address}
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 flex flex-col justify-center p-4 rounded-2xl w-full">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">
                      {t("wardsLabel")}
                    </div>
                    <div className="text-xl font-black text-[#1e3a8a]">
                      {data.wardsCount || 0}
                    </div>
                  </div>
                  <div className="bg-gray-50 flex flex-col justify-center p-4 rounded-2xl w-full">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">
                      {t("openNeedsLabel")}
                    </div>
                    <div className="text-xl font-black text-[#1e3a8a]">
                      {data.needsCount}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        {t("contactsLabel")}
                      </p>
                      <p className="font-bold text-gray-800">
                        {data.contactPhone || t("notProvided")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Email
                      </p>
                      <p className="font-bold text-gray-800">
                        {data.contactEmail || t("notProvided")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-transparent"
              >
                <Share2 size={18} className="mr-2" />
                {t("shareProfile")}
              </Button>
            </div>

            {/* ПРАВАЯ КОЛОНКА */}
            <div className="lg:col-span-8 space-y-8">
              {/* Описание */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    {t("aboutHeading")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t("aboutDescription", {
                      name: data.name,
                      city: data.city,
                    })}
                  </p>
                </div>

                <div className="w-full lg:w-[350px] bg-[#f8fafc] border border-gray-200 rounded-2xl p-6 flex-shrink-0">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-[#1e3a8a]" />{" "}
                    {t("officeHours")}
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] leading-relaxed break-words">
                    {data.activityHours && data.activityHours.trim() !== ""
                      ? data.activityHours
                      : t("notProvidedPlural")}
                  </div>
                </div>
              </div>

              {/* Запрещено приносить */}
              <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-red-50/50 px-8 py-6 border-b border-red-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                      <ShieldX size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">
                        {t("prohibitedTitle")}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  {prohibitedItems.length > 0 ? (
                    <ul className="space-y-3">
                      {prohibitedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2"></span>
                          <span className="text-gray-700 text-base leading-relaxed font-medium">
                            {item.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      {t("noInfoAvailable")}
                    </p>
                  )}
                </div>
              </div>

              {/* Рекомендуется приносить */}
              <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-50/50 px-8 py-6 border-b border-green-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <PackageCheck size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">
                        {t("recommendedTitle")}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  {recommendedItems.length > 0 ? (
                    <ul className="space-y-3">
                      {recommendedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-2"></span>
                          <span className="text-gray-700 text-base leading-relaxed font-medium">
                            {item.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      {t("noInfoAvailable")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
