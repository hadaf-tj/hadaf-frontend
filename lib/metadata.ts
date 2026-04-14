import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  noIndex?: boolean;
};

const DEFAULT_IMAGE = "/logo_thumbnail.webp";

export function createPageMetadata({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
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
      locale: "ru_RU",
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
