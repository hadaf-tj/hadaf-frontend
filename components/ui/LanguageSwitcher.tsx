// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { setUserLocale } from "@/i18n/locale";
import { locales, localeMeta, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  /** Visual style: inherits color from parent (header) or fixed light (footer). */
  variant?: "inherit" | "footer";
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "inherit",
  className,
}) => {
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const onSelect = (locale: Locale) => {
    setOpen(false);
    if (locale === activeLocale) return;
    startTransition(async () => {
      await setUserLocale(locale);
      router.refresh();
    });
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Сменить язык / Тағйири забон"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 h-9 text-sm font-bold transition-all",
          isPending && "opacity-60",
          variant === "footer"
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "hover:opacity-70",
        )}
      >
        <Globe size={18} className="shrink-0" />
        <span>{localeMeta[activeLocale].short}</span>
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute mt-2 min-w-[160px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-50 py-1",
            // Align the menu to the same edge as the trigger so it never drifts
            // across the container (the footer/mobile trigger is left-aligned,
            // the header trigger sits on the right).
            variant === "footer" ? "left-0" : "right-0",
          )}
        >
          {locales.map((locale) => {
            const isActive = locale === activeLocale;
            return (
              <li key={locale} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => onSelect(locale)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-bold text-left transition-colors",
                    isActive
                      ? "text-[#1e3a8a] bg-[#1e3a8a]/5"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1e3a8a]",
                  )}
                >
                  <span>{localeMeta[locale].nativeLabel}</span>
                  {isActive && (
                    <Check size={16} className="text-[#1e3a8a] shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
