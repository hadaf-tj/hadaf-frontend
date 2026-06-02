// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "О проекте",
  description:
    "О платформе адресной помощи: прозрачность, доверие и прямое взаимодействие с учреждениями.",
  canonical: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
