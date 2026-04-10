import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "События",
  description:
    "События и активности волонтёров: присоединяйтесь и помогайте вместе.",
  canonical: "/events",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
