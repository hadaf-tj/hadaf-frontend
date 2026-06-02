// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

type ApiResponse<T> = { message?: string; data: T };

function getBaseUrl() {
  return getSiteBaseUrl();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/about`, lastModified },
    { url: `${baseUrl}/contacts`, lastModified },
    { url: `${baseUrl}/faq`, lastModified },
    { url: `${baseUrl}/institutions`, lastModified },
    { url: `${baseUrl}/events`, lastModified },
    { url: `${baseUrl}/volunteers`, lastModified },
    { url: `${baseUrl}/map`, lastModified },
    { url: `${baseUrl}/documents`, lastModified },
    { url: `${baseUrl}/reports`, lastModified },
    { url: `${baseUrl}/rules`, lastModified },
    { url: `${baseUrl}/terms`, lastModified },
    { url: `${baseUrl}/privacy`, lastModified },
  ];

  try {
    const res = await fetch(`${baseUrl}/api/v1/institutions`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as
        | ApiResponse<Array<{ id: number }>>
        | ApiResponse<{ items?: Array<{ id: number }> }>;
      const institutions = Array.isArray(json?.data)
        ? json.data
        : json?.data?.items || [];
      for (const inst of institutions) {
        const rawId = inst?.id;
        if (typeof rawId !== "number" || !Number.isFinite(rawId) || rawId <= 0)
          continue;
        staticRoutes.push({
          url: `${baseUrl}/institutions/${rawId}`,
          lastModified,
        });
      }
    }
  } catch {}

  return staticRoutes;
}
