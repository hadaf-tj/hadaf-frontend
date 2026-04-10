import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Ответы на частые вопросы о том, как работает платформа и как помогать адресно.",
  canonical: "/faq",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
