import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Условия использования",
  description: "Пользовательское соглашение и условия использования платформы.",
  canonical: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
