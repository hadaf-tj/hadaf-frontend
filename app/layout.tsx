// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: app/layout.tsx */
import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import SplashScreen from "@/components/ui/SplashScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/ui/CookieBanner";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeMeta, type Locale } from "@/i18n/config";

const montserrat = Montserrat({
  // cyrillic-ext is required for full Tajik glyph coverage (ғ ҳ ҷ қ ӣ ӯ).
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.root");
  const locale = (await getLocale()) as Locale;
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(getSiteBaseUrl()),
    title: {
      default: title,
      template: t("titleTemplate"),
    },
    description,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        {
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Ҳадаф",
      locale: localeMeta[locale].ogLocale,
      url: "/",
      images: [
        {
          url: "/logo_thumbnail.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo_thumbnail.webp"],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;

  return (
    <html lang={localeMeta[locale].htmlLang} suppressHydrationWarning>
      <body className={montserrat.className}>
        <NextIntlClientProvider>
          <Providers>
            <ScrollToTop />
            <SplashScreen />
            {children}
            <CookieBanner />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
