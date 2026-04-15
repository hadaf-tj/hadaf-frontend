// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/**
 * Maps backend error codes to localized Russian UI strings.
 * Based on the backend refactoring to standardized uppercase snake_case string formats.
 */
export const ERROR_MESSAGES: Record<string, string> = {
  ERR_OTP_NOT_FOUND_OR_EXPIRED: "Код не найден или истек",
  ERR_OTP_INVALID: "Неверный код",
  ERR_USER_NOT_FOUND: "Пользователь не найден",
  ERR_ACCOUNT_PENDING_APPROVAL: "Ваш аккаунт ожидает подтверждения...",
  ERR_INVALID_CREDENTIALS: "Неверный пароль либо логин",
  ERR_ACCOUNT_NOT_ACTIVATED: "Аккаунт не активирован...",
  ERR_TOKEN_INVALID: "Недействительный токен",
  ERR_TOKEN_NOT_FOUND: "Токен не найден",
  ERR_TOKEN_REVOKED: "Токен был отозван",
  ERR_TOKEN_EXPIRED: "Срок действия токена истек",
  ERR_EMAIL_ALREADY_EXISTS: "Пользователь с таким email уже существует",
  ERR_INSTITUTION_ID_REQUIRED:
    "Для сотрудников обязательно указание учреждения",
  ERR_INSTITUTION_NOT_FOUND: "Указанное учреждение не найдено",
  ERR_BOOKING_ALREADY_EXISTS:
    "у вас уже есть активная заявка на помощь по этой нужде",
  ERR_RATE_LIMIT_REGISTRATION:
    "Слишком много попыток регистрации. Повторите позже.",
  ERR_RATE_LIMIT_LOGIN: "Слишком много попыток. Повторите позже",
  ERR_RATE_LIMIT_REFRESH: "Слишком частое обновление токенов. Повторите позже.",
  ERR_RATE_LIMIT_BOOKING:
    "Вы достигли лимита создания обещаний. Пожалуйста, попробуйте позже.",
};

/**
 * Helper function to safely extract a localized error message.
 * Falls back to the raw error code or a generic message if not mapped.
 */
export function getLocalizedError(
  errorNameOrCode: string,
  defaultMsg = "Произошла неизвестная ошибка",
): string {
  const code = errorNameOrCode?.trim() || "";

  if (ERROR_MESSAGES[code]) {
    return ERROR_MESSAGES[code];
  }

  // Fallback for unmapped backend error codes
  if (code.startsWith("ERR_")) {
    return `Системная ошибка (${code})`;
  }

  return code || defaultMsg;
}
