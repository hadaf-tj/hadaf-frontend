import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Отчёты",
  description: "Отчётные материалы проекта и результаты адресной помощи.",
  canonical: "/reports",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
