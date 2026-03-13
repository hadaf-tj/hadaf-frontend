import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Карта",
  description:
    "Карта социальных учреждений: найдите ближайшие и помогите адресно.",
  alternates: { canonical: "/map" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
