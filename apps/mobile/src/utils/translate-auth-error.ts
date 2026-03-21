import type { TFunction } from 'i18next';

const AUTH_ERROR_CODE_MAP: Record<string, string> = {
  INVALID_INPUT: 'errors:errors.auth.INVALID_INPUT',
  INVALID_CREDENTIALS: 'errors:errors.auth.INVALID_CREDENTIALS',
  EMAIL_ALREADY_REGISTERED: 'errors:errors.auth.EMAIL_ALREADY_REGISTERED',
  UNAUTHORIZED: 'errors:errors.auth.UNAUTHORIZED',
  NETWORK_ERROR: 'errors:errors.auth.NETWORK_ERROR',
  UNKNOWN_AUTH_ERROR: 'errors:errors.auth.UNKNOWN_AUTH_ERROR',
  ERR_AUTH_INVALID_PASSWORD: 'errors:errors.backend.ERR_AUTH_INVALID_PASSWORD',
  ERR_AUTH_INVALID_CREDENTIALS: 'errors:errors.backend.ERR_AUTH_INVALID_CREDENTIALS',
  ERR_AUTH_ACCOUNT_LOCKED: 'errors:errors.backend.ERR_AUTH_ACCOUNT_LOCKED',
};

export function translateAuthError(
  t: TFunction,
  code: string,
  fallbackMessage?: string,
): string {
  const translationKey = AUTH_ERROR_CODE_MAP[code] ?? 'errors:errors.auth.UNKNOWN';

  return t(translationKey, {
    defaultValue:
      fallbackMessage ??
      t('errors:errors.common.UNKNOWN', {
        defaultValue: 'An unexpected error occurred. Please try again.',
      }),
  });
}
