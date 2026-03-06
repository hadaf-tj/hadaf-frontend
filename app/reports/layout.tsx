import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отчёты — Ҳадаф",
  description: "Отчётные материалы проекта и результаты адресной помощи.",
  alternates: { canonical: "/reports" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
