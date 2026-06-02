// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: components/layout/MainLayout.tsx */
"use client";

import Header from "./Header";
import Footer from "./Footer";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import { getLocalizedError } from "@/lib/errorMessages";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleApiError = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        toast.error(getLocalizedError(customEvent.detail), {
          duration: 3000,
          position: "top-center",
          icon: "⚠️",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
          },
        });
      }
    };

    window.addEventListener("api-error", handleApiError);
    return () => window.removeEventListener("api-error", handleApiError);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f9ff]">
      <Toaster />
      <Header />

      {/* flex-grow заставляет контент занимать все свободное место */}
      <main className="flex-grow w-full">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
