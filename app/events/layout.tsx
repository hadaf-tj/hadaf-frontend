import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "События — Ҳадаф",
  description:
    "События и активности волонтёров: присоединяйтесь и помогайте вместе.",
  alternates: { canonical: "/events" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
