import { AuthError } from "@supabase/supabase-js";
import { ServiceError, ServiceResult } from "./auth.service.types";

export function mapAuthError(error: AuthError): ServiceError {
  const normalizedMessage = error.message.toLowerCase();

  if (error.status === 400 && normalizedMessage.includes("invalid login credentials")) {
    return {
      code: "INVALID_CREDENTIALS",
      message: "Enterprise credentials are invalid.",
    };
  }

  if (error.status === 422 && normalizedMessage.includes("already registered")) {
    return {
      code: "EMAIL_ALREADY_REGISTERED",
      message: "Enterprise identity already exists.",
    };
  }

  if (
    error.status === 401 ||
    normalizedMessage.includes("jwt") ||
    normalizedMessage.includes("unauthorized")
  ) {
    return {
      code: "UNAUTHORIZED",
      message: "Enterprise access is not authorized.",
    };
  }

  if (normalizedMessage.includes("network") || normalizedMessage.includes("fetch")) {
    return {
      code: "NETWORK_ERROR",
      message: "Network error while contacting authentication service.",
    };
  }

  return {
    code: "UNKNOWN_AUTH_ERROR",
    message: error.message,
  };
}

export function invalidInput(message: string): ServiceResult<never> {
  return {
    data: null,
    error: {
      code: "INVALID_INPUT",
      message,
    },
  };
}