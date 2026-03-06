import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Волонтёры — Ҳадаф",
  description:
    "Информация для волонтёров: как присоединиться и помогать адресно.",
  alternates: { canonical: "/volunteers" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
