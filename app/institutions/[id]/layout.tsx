// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo.server";
import { createPageMetadata } from "@/lib/metadata";

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

  let title = "Учреждение — Ҳадаф";
  let description = "Информация об учреждении и актуальные нужды.";

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
        if (where)
          description = `Информация об учреждении (${where}) и актуальные нужды.`;
      }
    }
  } catch {}

  const canonical = `/institutions/${encodeURIComponent(id)}`;

  const metadata = createPageMetadata({
    title,
    description,
    canonical,
    image: "/institution_id_hero.webp",
  });

  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
