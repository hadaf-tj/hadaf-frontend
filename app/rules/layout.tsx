import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Правила",
  description: "Правила использования платформы и принципы адресной помощи.",
  canonical: "/rules",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
