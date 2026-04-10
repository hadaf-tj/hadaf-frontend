/* FILE: app/layout.tsx */
import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import SplashScreen from "@/components/ui/SplashScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/ui/CookieBanner";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
});

const fallbackSiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://hadaf.tj"
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(
    (
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      fallbackSiteUrl
    ).replace(/\/$/, ""),
  ),
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
    icon: "/favicon.ico",
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
        url: "/hero.webp",
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
    images: ["/hero.webp"],
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
