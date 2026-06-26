// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";

/**
 * Maps backend error codes (standardized uppercase snake_case, e.g. `ERR_*`)
 * to localized UI strings via the `errors` translation namespace.
 *
 * Returns a stable translator function:
 *
 *   const translateError = useErrorTranslator();
 *   toast.error(translateError(err.message));
 */
export function useErrorTranslator() {
  const t = useTranslations("errors");

  return useCallback(
    (errorNameOrCode: string, defaultMsg?: string): string => {
      const code = errorNameOrCode?.trim() || "";

      // Known, explicitly mapped error code.
      if (code && t.has(code)) {
        return t(code);
      }

      // Unmapped backend error code — surface it transparently.
      if (code.startsWith("ERR_")) {
        return t("system", { code });
      }

      return code || defaultMsg || t("unknown");
    },
    [t],
  );
}
