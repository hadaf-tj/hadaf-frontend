// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

const PROD_SITE_URL = "https://hadaf.tj";
const DEV_SITE_URL = "http:////localhost:3000";

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, "");
}

function isLocalOrigin(origin: string) {
  return /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

export function getSiteBaseUrl(): string {
  const isProd = process.env.NODE_ENV === "production";
  const fallback = isProd ? PROD_SITE_URL : DEV_SITE_URL;

  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || fallback;
  const normalized = normalizeOrigin(fromEnv);

  if (isProd && isLocalOrigin(normalized)) {
    return PROD_SITE_URL;
  }

  return normalized;
}
