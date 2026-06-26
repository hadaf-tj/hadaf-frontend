// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({ namespace: "metadata.contacts", canonical: "/contacts" });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
