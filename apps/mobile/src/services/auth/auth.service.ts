import { ValidationError } from "yup";

import { supabase } from "@/src/lib/supabase";
import { signInDtoSchema, signUpDtoSchema } from "./auth.service.constants";
import type {
  AuthSessionPayload,
  ServiceResult,
  SignInWithEmailDto,
  SignUpDto,
} from "./auth.service.types";
import { invalidInput, mapAuthError } from "./auth.service.functions";

export async function signInWithEmail(
  payload: SignInWithEmailDto,
): Promise<ServiceResult<AuthSessionPayload>> {
  let parsedPayload: SignInWithEmailDto;

  try {
    parsedPayload = await signInDtoSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return invalidInput(error.errors.join("; "));
    }

    return invalidInput("Invalid request payload.");
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsedPayload);

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
}

export async function signUp(payload: SignUpDto): Promise<ServiceResult<AuthSessionPayload>> {
  let parsedPayload: SignUpDto;

  try {
    parsedPayload = await signUpDtoSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return invalidInput(error.errors.join("; "));
    }

    return invalidInput("Invalid request payload.");
  }

  const { data, error } = await supabase.auth.signUp(parsedPayload);

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
}

export async function signOut(): Promise<ServiceResult<true>> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: true,
    error: null,
  };
}

export async function getSession(): Promise<ServiceResult<AuthSessionPayload>> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.session?.user ?? null,
      session: data.session,
    },
    error: null,
  };
}
