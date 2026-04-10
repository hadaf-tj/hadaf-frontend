import type { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

function getBaseUrl() {
  return getSiteBaseUrl();
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
