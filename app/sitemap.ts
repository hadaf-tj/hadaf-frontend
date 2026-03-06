import type { MetadataRoute } from "next";

type ApiResponse<T> = { message?: string; data: T };

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
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

  // Добавляем страницы учреждений (если API доступен)
  try {
    const res = await fetch(`${baseUrl}/api/v1/institutions`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as ApiResponse<Array<{ id: number }>>;
      const institutions = Array.isArray(json?.data) ? json.data : [];
      for (const inst of institutions) {
        if (inst?.id == null) continue;
        staticRoutes.push({
          url: `${baseUrl}/institutions/${inst.id}`,
          lastModified,
        });
      }
    }
  } catch {
    // no-op: sitemap всё равно отдаём со статическими урлами
  }

  return staticRoutes;
}
