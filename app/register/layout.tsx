import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрация на платформе Ҳадаф для волонтёров и учреждений.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
