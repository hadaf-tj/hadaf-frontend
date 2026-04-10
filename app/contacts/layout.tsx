import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты",
  description:
    "Контакты команды проекта и способы связи по вопросам сотрудничества и поддержки.",
  canonical: "/contacts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
