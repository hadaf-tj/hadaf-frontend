// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/**
 * Shared i18n configuration.
 *
 * The app uses next-intl WITHOUT URL-based routing: the active locale is kept
 * in a cookie (see `i18n/locale.ts`) so public URLs stay language-agnostic.
 */

// Order here drives the language-switcher list order. Default locale first.
export const locales = ["tg", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tg";

/** Name of the cookie that stores the visitor's chosen locale. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Display + SEO metadata for each locale (used by the switcher and metadata). */
export const localeMeta: Record<
  Locale,
  {
    label: string;
    nativeLabel: string;
    short: string;
    htmlLang: string;
    ogLocale: string;
  }
> = {
  // `tg` is the ISO 639-1 code for the Tajik language (NOT Telegram).
  // `htmlLang`/`ogLocale` use the full BCP-47 region tag (tg-TJ = Tajik / Tajikistan).
  tg: {
    label: "Таджикский",
    nativeLabel: "Тоҷикӣ",
    short: "TJ",
    htmlLang: "tg-TJ",
    ogLocale: "tg_TJ",
  },
  ru: {
    label: "Русский",
    nativeLabel: "Русский",
    short: "RU",
    htmlLang: "ru-RU",
    ogLocale: "ru_RU",
  },
  en: {
    label: "Английский",
    nativeLabel: "English",
    short: "EN",
    htmlLang: "en-US",
    ogLocale: "en_US",
  },
};

/** Narrowing helper that validates an arbitrary value against the locale list. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
