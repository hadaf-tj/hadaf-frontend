"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
  const [submitted, setSubmitted] = useState(false);

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
    console.log("Application submitted:", data);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="mb-3 text-2xl sm:text-3xl font-black text-[#1e3a8a]">
          {t("form.successTitle")}
        </h3>

        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          {t("form.successText")}
        </p>

        {/* Next Steps Box */}
        <div className="mb-8 rounded-2xl bg-gray-50 border border-gray-100 p-5 sm:p-6 text-left max-w-lg mx-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1e3a8a]" />
            <span>{t("form.successNextStepsTitle")}</span>
          </h4>
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a]/10 text-xs font-bold text-[#1e3a8a]">
                1
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {t("form.successStep1")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a]/10 text-xs font-bold text-[#1e3a8a]">
                2
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {t("form.successStep2")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1e3a8a] px-7 py-4 font-bold text-white shadow-lg shadow-[#1e3a8a]/20 transition-all hover:bg-[#2a4ec2]"
          >
            {t("form.backHome")}
          </Link>
          <button
            type="button"
            onClick={() => {
              reset();
              setSubmitted(false);
            }}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-7 py-4 font-bold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
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