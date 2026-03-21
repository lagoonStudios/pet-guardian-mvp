import { config } from '@/src/lib/config';
import { supabase } from "@/lib/supabase";

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
  if (errorCode === "invalid_grant" || errorCode === "invalid_credentials") {
    return "invalid_credentials";
  }

  return 'unknown';
};

const mapSupabaseError = (error: {
  code?: string;
  message?: string;
}): AuthServiceResult["error"] => {
  const normalizedMessage = (error.message ?? "").toLowerCase();

  if (
    mapSupabaseErrorCode(error.code) === "invalid_credentials" ||
    normalizedMessage.includes("invalid login credentials")
  ) {
    return {
      code: "invalid_credentials",
      message: error.message ?? "Invalid user credentials",
    };
  }

  if (
    normalizedMessage.includes("network") ||
    normalizedMessage.includes("fetch") ||
    normalizedMessage.includes("failed to fetch")
  ) {
    return {
      code: "network_error",
      message: error.message ?? "Unable to reach authentication service",
    };
  }

  return {
    code: "unknown",
    message: error.message ?? "Authentication request failed",
  };
};

export const signInWithPassword = async (input: {
  email: string;
  password: string;
}): Promise<AuthServiceResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(input);

    if (error) {
      return {
        data: null,
        error: mapSupabaseError(error),
      };
    }

    return {
      data: {
        accessToken: data.session?.access_token ?? "",
        refreshToken: data.session?.refresh_token ?? "",
        userId: data.user?.id ?? "",
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
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      return {
        data: null,
        error: {
          code: mapSupabaseError(error).code,
          message: error.message ?? "Unable to retrieve session",
        },
      };
    }

    return {
      data: {
        accessToken,
        refreshToken: "",
        userId: data.user?.id ?? "",
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