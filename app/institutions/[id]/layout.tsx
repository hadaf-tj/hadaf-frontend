// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/seo.server";
import type { Locale } from "@/i18n/config";

type ApiResponse<T> = { message?: string; data: T };

type BackendInstitution = {
  id: number;
  name: string;
  description?: string;
  city?: string;
  region?: string;
  address?: string;
  type?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations("metadata.institutionDetail");
  const locale = (await getLocale()) as Locale;

  let title = t("title");
  let description = t("description");

  try {
    const res = await fetch(await absoluteUrl(`/api/v1/institutions/${id}`), {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as ApiResponse<BackendInstitution>;
      const inst = json?.data;
      if (inst?.name) title = `${inst.name} — Ҳадаф`;
      if (inst?.description) description = inst.description;
      else if (inst?.city || inst?.region) {
        const where = [inst.city, inst.region].filter(Boolean).join(", ");
        if (where) description = t("descriptionWithLocation", { where });
      }
    }
  } catch {}

  const canonical = `/institutions/${encodeURIComponent(id)}`;
  const image = "/institution_id_hero.webp";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Ҳадаф",
      locale: locale === "tg" ? "tg_TJ" : "ru_RU",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
