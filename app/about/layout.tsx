import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "О платформе адресной помощи: прозрачность, доверие и прямое взаимодействие с учреждениями.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
