// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/80",

        secondary:
          "border-transparent bg-[#f3e8ff] text-[#1e3a8a] hover:bg-[#f3e8ff]/80",

        urgent:
          "border-transparent bg-[#ffca63] text-gray-900 hover:bg-[#ffca63]/80",

        success:
          "border-transparent bg-emerald-500 text-white hover:bg-emerald-600",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-[#1e3a8a] border border-[#1e3a8a]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
