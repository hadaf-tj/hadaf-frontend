"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Activity,
  Lock,
  AlertCircle,
  CheckCircle2,
  Send,
  Clock,
  LogIn,
  Loader2,
  FileText,
  ShieldCheck,
} from "lucide-react";

function parseLocalDate(dateString: string): Date | null {
  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function calculateAge(birthDate: Date, today: Date): number {
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default function ApplicationForm() {
  const t = useTranslations("needHelp");
  const { user, isLoading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(
    null,
  );

  const applicationSchema = z.object({
    fullName: z
      .string()
      .trim()
      .min(2, t("form.errors.fullName")),

    birthDate: z
      .string()
      .min(1, t("form.errors.birthDate"))
      .refine(
        (value) => {
          const birthDate = parseLocalDate(value);
          if (!birthDate) return false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return birthDate <= today;
        },
        {
          message: t("form.errors.futureDate"),
        }
      )
      .refine(
        (value) => {
          const birthDate = parseLocalDate(value);
          if (!birthDate) return false;
          const today = new Date();
          return calculateAge(birthDate, today) < 12;
        },
        {
          message: t("form.errors.age"),
        }
      ),

    city: z
      .string()
      .trim()
      .min(2, t("form.errors.city")),

    phone: z
      .string()
      .trim()
      .min(5, t("form.errors.phone"))
      .regex(/^[+]?[0-9\s\-()]{5,20}$/, t("form.errors.phone")),

    diagnosis: z.literal("cerebral_palsy"),
  });

  type ApplicationFormData = z.infer<typeof applicationSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      diagnosis: "cerebral_palsy",
    },
  });

  // Calculate live age preview
  const birthDateValue = watch("birthDate");
  const parsedDate = birthDateValue ? parseLocalDate(birthDateValue) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFuture = parsedDate ? parsedDate > today : false;
  const computedAge = parsedDate && !isFuture ? calculateAge(parsedDate, today) : null;
  const isAgeValid = computedAge !== null && computedAge >= 0 && computedAge < 12 && !errors.birthDate;

  const onSubmit = async (data: ApplicationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmittedData(data);
    setSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-7 h-7 text-[#1e3a8a] animate-spin" />
        <span className="text-sm font-semibold text-gray-500">
          {t("form.checkingAuth")}
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-2 animate-in fade-in zoom-in-95 duration-300">
        <p className="mx-auto max-w-md text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
          {t("form.guestIntro")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 max-w-md mx-auto">
          <Link
            href="/login?from=/need-help/apply"
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#1e3a8a] px-7 py-4 font-black text-white text-base shadow-xl shadow-[#1e3a8a]/20 transition-all duration-200 hover:bg-[#2546a8] sm:flex-1"
          >
            <LogIn className="w-4 h-4" />
            {t("form.loginRequiredLogin")}
          </Link>
          <Link
            href="/register?from=/need-help/apply"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-7 py-4 font-bold text-gray-700 text-base transition hover:bg-gray-50 hover:border-gray-300 sm:flex-1"
          >
            {t("form.loginRequiredRegister")}
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    const submittedBirth = submittedData?.birthDate
      ? parseLocalDate(submittedData.birthDate)
      : null;
    const submittedAge =
      submittedBirth && submittedBirth <= today
        ? calculateAge(submittedBirth, today)
        : null;
    const formattedBirth = submittedBirth
      ? submittedBirth.toLocaleDateString("ru-RU")
      : null;

    const summaryRows = [
      {
        icon: User,
        label: t("form.successChild"),
        value: submittedData?.fullName,
      },
      {
        icon: Calendar,
        label: t("form.successBirthDate"),
        value: formattedBirth,
      },
      {
        icon: Clock,
        label: t("form.successAge"),
        value:
          submittedAge !== null
            ? t("form.successAgeValue", { age: submittedAge })
            : null,
      },
      {
        icon: MapPin,
        label: t("form.successCity"),
        value: submittedData?.city,
      },
      {
        icon: Phone,
        label: t("form.successPhone"),
        value: submittedData?.phone,
      },
    ];

    return (
      <div className="py-2 animate-in fade-in zoom-in-95 duration-300">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6 h-20 w-20">
            <span className="absolute inset-0 rounded-3xl bg-emerald-400/30 animate-ping" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>

          <h3 className="mb-3 text-2xl sm:text-3xl font-black text-[#1e3a8a]">
            {t("form.successTitle")}
          </h3>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {t("form.successText")}
          </p>
        </div>

        {/* Application summary */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50/80 to-white p-5 sm:p-6 text-left">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1e3a8a]" />
            <span>{t("form.successSummaryTitle")}</span>
          </h4>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {summaryRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3.5 rounded-xl bg-white/70 border border-gray-100/80 px-4 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a]">
                  <row.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <dt className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    {row.label}
                  </dt>
                  <dd className="text-sm sm:text-base font-black text-gray-800 truncate">
                    {row.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Next steps timeline */}
        <div className="mb-8 text-left max-w-2xl mx-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1e3a8a]" />
            <span>{t("form.successNextStepsTitle")}</span>
          </h4>

          <ol className="relative border-l-2 border-gray-100 ml-3.5 space-y-6">
            {[
              t("form.successStep1"),
              t("form.successStep2"),
              t("form.successStep3"),
            ].map((step, index) => (
              <li key={index} className="relative pl-7">
                <span className="absolute -left-[15px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#1e3a8a] text-white text-xs font-black shadow-md shadow-[#1e3a8a]/20">
                  {index + 1}
                </span>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium pt-0.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Trust badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-emerald-600">
            <CheckCircle2 className="w-3 h-3" />
            {t("form.successTrustFree")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[#1e3a8a]">
            <ShieldCheck className="w-3 h-3" />
            {t("form.successTrustTransparent")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-gray-500">
            <Lock className="w-3 h-3" />
            {t("form.successTrustPrivate")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center max-w-xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1e3a8a] px-7 py-4 font-black text-white text-base shadow-lg shadow-[#1e3a8a]/20 transition-all hover:bg-[#2a4ec2] hover:shadow-xl hover:shadow-[#1e3a8a]/25 sm:flex-1"
          >
            {t("form.backHome")}
          </Link>
          <button
            type="button"
            onClick={() => {
              reset();
              setSubmittedData(null);
              setSubmitted(false);
            }}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-7 py-4 font-bold text-gray-700 text-base transition hover:bg-gray-50 hover:border-gray-300 sm:flex-1"
          >
            {t("form.submitAnother")}
          </button>
        </div>
      </div>
    );
  }

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-gray-800">
          {t("form.fullName")} <span className="text-red-500">*</span>
        </label>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <User className="w-5 h-5" />
          </div>

          <input
            {...register("fullName")}
            type="text"
            placeholder={t("form.fullNamePlaceholder")}
            className={cn(
              "w-full rounded-2xl border bg-white pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium outline-none transition-all duration-200 shadow-sm",
              errors.fullName
                ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/10"
            )}
          />
        </div>

        {errors.fullName && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errors.fullName.message}</span>
          </div>
        )}
      </div>

      {/* Birth Date */}
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-gray-800">
          {t("form.birthDate")} <span className="text-red-500">*</span>
        </label>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <Calendar className="w-5 h-5" />
          </div>

          <input
            {...register("birthDate")}
            type="date"
            max={todayStr}
            className={cn(
              "w-full rounded-2xl border bg-white pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium outline-none transition-all duration-200 shadow-sm",
              errors.birthDate
                ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/10"
            )}
          />
        </div>

        {/* Live Age Verification / Error Feedback */}
        {isAgeValid && (
          <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("form.ageCalculated", { age: computedAge })}</span>
          </div>
        )}

        {errors.birthDate && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-red-600 border border-red-200/80">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errors.birthDate.message}</span>
          </div>
        )}
      </div>

      {/* City */}
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-gray-800">
          {t("form.city")} <span className="text-red-500">*</span>
        </label>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <MapPin className="w-5 h-5" />
          </div>

          <input
            {...register("city")}
            type="text"
            placeholder={t("form.cityPlaceholder")}
            className={cn(
              "w-full rounded-2xl border bg-white pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium outline-none transition-all duration-200 shadow-sm",
              errors.city
                ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/10"
            )}
          />
        </div>

        {errors.city && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errors.city.message}</span>
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-gray-800">
          {t("form.phone")} <span className="text-red-500">*</span>
        </label>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <Phone className="w-5 h-5" />
          </div>

          <input
            {...register("phone")}
            type="tel"
            placeholder={t("form.phonePlaceholder")}
            className={cn(
              "w-full rounded-2xl border bg-white pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium outline-none transition-all duration-200 shadow-sm",
              errors.phone
                ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 hover:border-gray-300 focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/10"
            )}
          />
        </div>

        {errors.phone && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errors.phone.message}</span>
          </div>
        )}
      </div>

      {/* Diagnosis - Visual Lock parameter card */}
      <div className="rounded-2xl border-2 border-dashed border-blue-200/90 bg-gradient-to-r from-blue-50/60 to-white p-5 transition-all">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#1e3a8a] flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>{t("form.diagnosis")}</span>
          </label>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/90 px-3 py-1 text-[11px] font-black text-[#1e3a8a]">
            <Lock className="w-3 h-3" />
            MVP Fixed
          </span>
        </div>

        <div className="text-base sm:text-lg font-black text-gray-900">
          {t("form.diagnosisValue")}
        </div>

        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
          {t("form.diagnosisLocked")}
        </p>

        <input type="hidden" {...register("diagnosis")} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full rounded-2xl bg-[#1e3a8a] py-4 px-6 font-black text-white text-base sm:text-lg shadow-xl shadow-[#1e3a8a]/20 transition-all duration-200 hover:bg-[#2546a8] hover:shadow-2xl hover:shadow-[#1e3a8a]/30 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2.5 group"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{t("form.submitting")}</span>
          </>
        ) : (
          <>
            <span>{t("form.submit")}</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}