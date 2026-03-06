import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Документы — Ҳадаф",
  description:
    "Документы проекта: регламенты, материалы и справочная информация.",
  alternates: { canonical: "/documents" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
