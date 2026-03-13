import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Учреждения",
  description:
    "Реестр проверенных социальных учреждений. Выберите учреждение и помогите адресно.",
  alternates: { canonical: "/institutions" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
