// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/i18n/locale";

/**
 * next-intl request configuration. Resolves the active locale from the cookie
 * and loads the matching message catalog for every server request.
 */
export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
