import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Волонтёры",
  description:
    "Информация для волонтёров: как присоединиться и помогать адресно.",
  canonical: "/volunteers",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
