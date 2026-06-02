"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hadaf_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("hadaf_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28 py-3 sm:py-4 flex items-center gap-3 sm:gap-5">
          <div className="w-9 h-9 rounded-full bg-[#ffca63]/20 text-[#1e3a8a] flex items-center justify-center shrink-0 hidden sm:flex">
            <Cookie size={18} />
          </div>

          <p className="flex-1 text-xs sm:text-sm text-gray-600 leading-snug">
            Мы используем cookie для сохранения сессии. Продолжая, вы
            соглашаетесь с{" "}
            <Link
              href="/privacy"
              className="text-[#1e3a8a] underline font-medium hover:text-[#ffca63] transition-colors"
            >
              Политикой конфиденциальности
            </Link>
            .
          </p>

          <Button
            onClick={acceptCookies}
            className="shrink-0 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold h-9 sm:h-10 px-5 sm:px-6 rounded-full text-xs sm:text-sm"
          >
            Понятно
          </Button>
        </div>
      </div>
    </div>
  );
}
