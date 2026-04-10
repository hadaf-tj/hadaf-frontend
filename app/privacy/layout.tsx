import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Информация о сборе и обработке персональных данных на платформе.",
  canonical: "/privacy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
