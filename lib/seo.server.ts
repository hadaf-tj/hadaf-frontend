import "server-only";

import { headers } from "next/headers";

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, "");
}

export async function getSiteUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (fromEnv) return normalizeOrigin(fromEnv);

  const h = await headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host");
  if (host) return `${proto}://${host}`;

  return "http://localhost:3000";
}

export async function absoluteUrl(pathname: string): Promise<string> {
  const base = await getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
