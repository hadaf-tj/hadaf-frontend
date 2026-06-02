// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: components/ui/OrnamentDivider.tsx */
"use client";

import { cn } from "@/lib/utils";

interface OrnamentDividerProps {
  className?: string;
  opacity?: string;
  height?: string;
}

const OrnamentDivider: React.FC<OrnamentDividerProps> = ({
  className,

  opacity = "opacity-20",

  height = "h-24 md:h-32",
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white",
        height,
        className,
      )}
    >
      {/* Слой с картинкой.
         - absolute inset-0: растягиваем на весь родительский div
         - bg-[url('/ornament.webp')]: подключаем картинку
         - bg-repeat: замостить узором всё пространство
         - bg-center: центрируем
         - mix-blend-multiply: режим наложения, чтобы белый фон картинки стал прозрачным, 
           а узор "впитался" в фон под ним. Отлично работает на светлых фонах.
      */}
      <div
        className={cn(
          "absolute inset-0 bg-[url('/ornament.webp')] bg-repeat bg-contain bg-center",
          opacity,

          "mix-blend-multiply",
        )}
      ></div>

      {/* Опционально: Можно добавить поверх легкий градиент, чтобы края были мягче */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50"></div>
    </div>
  );
};

export default OrnamentDivider;
