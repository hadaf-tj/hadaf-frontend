import MainLayout from "@/components/layout/MainLayout";
import ApplicationForm from "./ApplicationForm";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  CalendarX2,
  RefreshCw,
  ShieldCheck,
  HeartHandshake,
  Clock,
} from "lucide-react";

interface QuotaData {
  limit?: number;
  used?: number;
  remaining?: number;
  allowed: boolean;
}

export default async function ApplyPage() {
  const t = await getTranslations("needHelp");

  const baseUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:8000";
  let quota: QuotaData | null = null;
  let fetchError = false;

  try {
    const response = await fetch(`${baseUrl}/api/v1/beneficiaries/quota`, {
      cache: "no-store",
    });

    if (!response.ok) {
      fetchError = true;
    } else {
      const result = await response.json();
      quota = result?.data ?? null;
      if (!quota || typeof quota.allowed !== "boolean") {
        fetchError = true;
      }
    }
  } catch (error) {
    console.error("Failed to fetch beneficiary quota:", error);
    fetchError = true;
  }

  return (
    <MainLayout>
      {/* Header with deep blue backdrop, ornaments, and breadcrumbs */}
      <div className="relative bg-[#1e3a8a] pt-28 sm:pt-36 pb-16 sm:pb-24 rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/[0.07] to-transparent rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#ffca63]/[0.1] rounded-full blur-[70px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 relative z-10">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              href="/need-help"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("backToNeedHelp")}</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#ffca63] rounded-full" />
              <span className="text-[#ffca63] font-bold text-xs sm:text-sm uppercase tracking-[0.18em]">
                {t("applyBadge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
              {t("applyPageTitle")}
            </h1>

            <p className="text-white/75 text-base sm:text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              {t("applyPageSubtitle")}
            </p>

            {/* Quick feature tags */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-white/90 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#ffca63]" />
                <span>Бесплатно & Прозрачно</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-white/90 border border-white/10">
                <Clock className="w-4 h-4 text-[#ffca63]" />
                <span>Дети до 12 лет</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-white/90 border border-white/10">
                <HeartHandshake className="w-4 h-4 text-[#ffca63]" />
                <span>Диагноз ДЦП</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative bg-[#f8faff] min-h-[60vh] overflow-hidden py-10 sm:py-16">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#1e3a8a]/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 relative z-10">
          <div className="max-w-3xl mx-auto">
            {fetchError ? (
              /* Network or Server Error State */
              <div className="rounded-[2.5rem] border border-amber-200/80 bg-white p-8 sm:p-12 text-center shadow-xl shadow-amber-500/5">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 border border-amber-100">
                  <AlertCircle className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mb-3">
                  {t("quotaErrorTitle")}
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                  {t("quotaErrorMessage")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                  <Link
                    href="/need-help/apply"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1e3a8a] px-7 py-4 font-bold text-white shadow-lg shadow-[#1e3a8a]/20 transition-all hover:bg-[#2a4ec2] hover:shadow-xl hover:shadow-[#1e3a8a]/25"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t("reloadPage")}</span>
                  </Link>
                  <Link
                    href="/need-help"
                    className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 px-7 py-4 font-bold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
                  >
                    {t("form.backHome")}
                  </Link>
                </div>
              </div>
            ) : quota && !quota.allowed ? (
              /* Quota Full State */
              <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-2xl shadow-[#1e3a8a]/5">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-[#1e3a8a] border border-blue-100/60">
                  <CalendarX2 className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-4">
                  {t("quotaFullTitle")}
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto">
                  {t("quotaFullMessage")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                  <Link
                    href="/need-help"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#1e3a8a] px-7 py-4 font-bold text-white shadow-lg shadow-[#1e3a8a]/20 transition-all hover:bg-[#2a4ec2]"
                  >
                    {t("form.backHome")}
                  </Link>
                  <Link
                    href="/contacts"
                    className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 px-7 py-4 font-bold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
                  >
                    {t("contactButton")}
                  </Link>
                </div>
              </div>
            ) : (
              /* Active Application Form Container */
              <div className="rounded-[2.5rem] border border-gray-100/80 bg-white p-6 sm:p-12 shadow-2xl shadow-[#1e3a8a]/5">
                {/* Program Criteria Callout */}
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-100/80 p-5 flex items-start gap-4">
                  <div className="rounded-xl bg-[#1e3a8a] text-white p-2.5 shrink-0 shadow-md shadow-[#1e3a8a]/15 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1e3a8a] mb-1">
                      {t("criteriaNoticeTitle")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {t("criteriaNoticeText")}
                    </p>
                  </div>
                </div>

                <ApplicationForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
