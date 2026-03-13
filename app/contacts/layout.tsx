import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты команды проекта и способы связи по вопросам сотрудничества и поддержки.",
  alternates: { canonical: "/contacts" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
