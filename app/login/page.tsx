"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, HeartHandshake, Loader2, Clock } from "lucide-react";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { getLocalizedError } from "@/lib/errorMessages";

function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const searchParams = useSearchParams();
  const isPending = searchParams.get("pending") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      await refreshUser();
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? getLocalizedError(err.message)
          : getLocalizedError("");
      console.error(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative font-sans">
      {/* Кнопка назад */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-[#1e3a8a] flex items-center gap-2 font-bold transition-colors"
      >
        <ArrowLeft size={20} />
        На главную
      </Link>

      {/* Логотип и заголовок */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-900/20">
          <HeartHandshake size={28} />
        </div>
        <h1 className="text-2xl font-black text-gray-900">
          С возвращением в Hadaf
        </h1>
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
        {/* Баннер ожидания одобрения (показывается только для employee после регистрации) */}
        {isPending && (
          <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <Clock className="text-amber-500 mt-0.5 shrink-0" size={20} />
            <div>
              <p className="text-amber-800 font-bold text-sm">
                Аккаунт на рассмотрении
              </p>
              <p className="text-amber-700 text-xs mt-0.5">
                Ваш аккаунт сотрудника ожидает подтверждения администратором.
                Как только вы получите доступ — войдите здесь.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
              Почта
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Пароль
              </label>
              <span
                className="text-xs font-bold text-gray-400 cursor-not-allowed"
                title="Скоро"
              >
                Забыли? (скоро)
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold text-base rounded-xl mt-2 shadow-lg shadow-[#1e3a8a]/20 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Войти"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative bg-white px-3 text-xs font-bold text-gray-400 uppercase">
              Или
            </span>
          </div>

          <button
            type="button"
            disabled
            className="w-full h-12 bg-white border border-gray-200 text-gray-400 font-bold rounded-xl flex items-center justify-center gap-3 cursor-not-allowed opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Войти через Google (скоро)
          </button>
        </div>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="text-[#1e3a8a] font-black hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
