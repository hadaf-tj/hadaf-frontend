import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Карта",
  description:
    "Карта социальных учреждений: найдите ближайшие и помогите адресно.",
  canonical: "/map",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
