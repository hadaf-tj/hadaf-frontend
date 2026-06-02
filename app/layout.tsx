// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: app/layout.tsx */
import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import SplashScreen from "@/components/ui/SplashScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/ui/CookieBanner";
import { getSiteBaseUrl } from "@/lib/site-url";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(getSiteBaseUrl()),
  title: {
    default: "Ҳадаф: Адресная помощь",
    template: "%s — Ҳадаф",
  },
  description:
    "Платформа для прозрачной адресной помощи социальным учреждениям Таджикистана.",
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
    title: "Ҳадаф: Адресная помощь",
    description:
      "Платформа для прозрачной адресной помощи социальным учреждениям Таджикистана.",
    type: "website",
    siteName: "Ҳадаф",
    locale: "ru_RU",
    url: "/",
    images: [
      {
        url: "/logo_thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Ҳадаф: Адресная помощь",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ҳадаф: Адресная помощь",
    description:
      "Платформа для прозрачной адресной помощи социальным учреждениям Таджикистана.",
    images: ["/logo_thumbnail.webp"],
  },
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <ScrollToTop />
          <SplashScreen />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
