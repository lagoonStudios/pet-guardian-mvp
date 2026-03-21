import { config } from '@/src/lib/config';

export const SUPABASE_URL = config.EXPO_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = config.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export type AuthErrorCode = 'invalid_credentials' | 'network_error' | 'unknown';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthServiceResult {
  data: AuthSession | null;
  error: {
    code: AuthErrorCode;
    message: string;
  } | null;
}

const mapSupabaseErrorCode = (errorCode?: string): AuthErrorCode => {
  if (errorCode === 'invalid_grant') {
    return 'invalid_credentials';
  }

  return 'unknown';
};

export const signInWithPassword = async (input: {
  email: string;
  password: string;
}): Promise<AuthServiceResult> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          code: mapSupabaseErrorCode(body?.error_code),
          message: body?.msg ?? 'Authentication request failed',
        },
      };
    }

    return {
      data: {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
        userId: body.user.id,
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: 'network_error',
        message: 'Unable to reach authentication service',
      },
    };
  }
};

export const getSession = async (accessToken: string): Promise<AuthServiceResult> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          code: 'unknown',
          message: body?.msg ?? 'Unable to retrieve session',
        },
      };
    }

    return {
      data: {
        accessToken,
        refreshToken: '',
        userId: body.id,
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: 'network_error',
        message: 'Unable to retrieve session',
      },
    };
  }
};