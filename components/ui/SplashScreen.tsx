"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import React, { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(true);
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    // Contextual hydration check stored in sessionStorage

    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setShouldRender(false);
      return;
    }

    sessionStorage.setItem("hasSeenSplash", "true");

    // Animation timeout duration
    const fadeTimer = setTimeout(() => setPhase("fading"), 3500);
    const unmountTimer = setTimeout(() => setShouldRender(false), 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8fafc] transition-opacity duration-500 ease-out"
      style={{ opacity: phase === "fading" ? 0 : 1 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Анимация "Мост доверия" */}
        <svg
          viewBox="0 0 400 120"
          className="w-[300px] sm:w-[450px] stroke-[#1e3a8a] fill-none stroke-[3px] stroke-linecap-round stroke-linejoin-round overflow-visible"
        >
          {/* 1. Сердце (донор) - рисуется первым */}
          <g transform="translate(40, 45) scale(1.5)">
            <path
              pathLength="100"
              className="animate-draw-1"
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </g>

          {/* 2. Мост (линия) - рисуется вторым */}
          <path
            pathLength="100"
            className="animate-draw-2"
            d="M 95 70 Q 200 20 305 70"
          />

          {/* 3. Домик (учреждение) - рисуется третьим */}
          <g transform="translate(315, 45) scale(1.5)">
            <path
              pathLength="100"
              className="animate-draw-3"
              d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            />
            <polyline
              pathLength="100"
              className="animate-draw-3"
              points="9 22 9 12 15 12 15 22"
            />
          </g>
        </svg>

        {/* Название появляется в конце */}
        <h1 className="mt-8 text-2xl sm:text-3xl font-black text-[#1e3a8a] tracking-[0.2em] opacity-0 animate-fade-in-up uppercase">
          Ҳадаф
        </h1>
      </div>

      <style jsx>{`
        .animate-draw-1 {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 1s ease-in-out forwards;
        }
        .animate-draw-2 {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 1s ease-in-out 0.8s forwards;
        }
        .animate-draw-3 {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 1s ease-in-out 1.6s forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 2.2s forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
