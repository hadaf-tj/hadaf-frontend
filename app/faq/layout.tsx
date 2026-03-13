import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Ответы на частые вопросы о том, как работает платформа и как помогать адресно.",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
