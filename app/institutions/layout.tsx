// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Учреждения",
  description:
    "Реестр проверенных социальных учреждений. Выберите учреждение и помогите адресно.",
  canonical: "/institutions",
  image: "/logo_thumbnail.webp",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
