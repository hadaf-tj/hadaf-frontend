"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useEffect, useState } from "react";
import {
  Heart,
  PackageCheck,
  Clock,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getProfile } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    full_name: string;
    role: string;
    email: string;
    phone?: string;
    institution_id?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (e) {
        console.error("Authorization error:", e);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#1e3a8a]" size={36} />
      </div>
    );
  }
  if (!user) return null;

  const firstName = user.full_name.split(" ")[0] || user.full_name;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          Привет, {firstName} 👋
        </h1>
        <p className="text-gray-500 font-medium mt-0.5 text-sm sm:text-base">
          Добро пожаловать в личный кабинет
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <PackageCheck size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-0.5">
            0
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
            Закрытых
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-0.5">
            0
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
            Активных
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Heart size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-0.5">
            0
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
            Вклад
          </div>
        </div>
      </div>

      {/* CTA - for volunteers */}
      {user?.role !== "employee" && (
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#2d4ea0] text-white rounded-2xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
              <Sparkles size={12} />
              Начните сегодня
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3">
              С чего начать?
            </h3>
            <p className="text-white/80 mb-5 text-sm sm:text-base leading-relaxed">
              Выберите учреждение, найдите актуальную нужду и нажмите «Я
              привезу». Это просто!
            </p>
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 bg-[#ffca63] text-[#1e3a8a] px-5 sm:px-7 py-3 rounded-xl font-black hover:bg-white transition-all text-sm sm:text-base shadow-lg"
            >
              Перейти к нуждам
              <ArrowRight size={16} />
            </Link>
          </div>
          {/* Decorative */}
          <div className="absolute -right-6 -bottom-6 opacity-[0.07] pointer-events-none">
            <Heart size={160} strokeWidth={1} />
          </div>
        </div>
      )}
    </div>
  );
}
