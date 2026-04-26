// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import "server-only";

import { headers } from "next/headers";
import { getSiteBaseUrl } from "@/lib/site-url";

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, "");
}

// Allowed host domains array
const ALLOWED_HOSTS = new Set(["hadaf.tj", "www.hadaf.tj", "localhost:3000"]);

export async function getSiteUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (fromEnv) return getSiteBaseUrl();

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  if (host && ALLOWED_HOSTS.has(host)) {
    const proto = h.get("x-forwarded-proto") || "https";
    return `${proto}://${host}`;
  }

  return getSiteBaseUrl();
}

export async function absoluteUrl(pathname: string): Promise<string> {
  const base = await getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
