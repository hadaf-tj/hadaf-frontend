import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в личный кабинет волонтёра или сотрудника учреждения.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
