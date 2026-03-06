import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования — Ҳадаф",
  description: "Пользовательское соглашение и условия использования платформы.",
  alternates: { canonical: "/terms" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
