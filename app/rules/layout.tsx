import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правила",
  description: "Правила использования платформы и принципы адресной помощи.",
  alternates: { canonical: "/rules" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
