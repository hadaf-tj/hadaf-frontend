import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Регистрация",
  description: "Регистрация на платформе Ҳадаф для волонтёров и учреждений.",
  canonical: "/register",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
