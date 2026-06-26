// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localeMeta, type Locale } from "@/i18n/config";

type PageMetadataInput = {
  /**
   * Translation namespace holding `title` and `description` keys,
   * e.g. "metadata.about".
   */
  namespace: string;
  canonical: string;
  image?: string;
  noIndex?: boolean;
};

const DEFAULT_IMAGE = "/logo_thumbnail.webp";

/**
 * Builds locale-aware page metadata from a translation namespace.
 *
 * Usage inside a route `layout.tsx`:
 *
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return createPageMetadata({ namespace: "metadata.about", canonical: "/about" });
 *   }
 */
export async function createPageMetadata({
  namespace,
  canonical,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: PageMetadataInput): Promise<Metadata> {
  const t = await getTranslations(namespace);
  const locale = (await getLocale()) as Locale;

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Ҳадаф",
      locale: localeMeta[locale].ogLocale,
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}
