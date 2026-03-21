import type { Session, User } from '@supabase/supabase-js';
import type { z } from 'zod';

import { signInDtoSchema, signUpDtoSchema } from './auth.service.schemas';

export type SignInWithEmailDto = z.infer<typeof signInDtoSchema>;
export type SignUpDto = z.infer<typeof signUpDtoSchema>;

export type AuthErrorCode =
  | 'INVALID_INPUT'
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_REGISTERED'
  | 'UNAUTHORIZED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_AUTH_ERROR';

export interface ServiceError {
  code: AuthErrorCode;
  message: string;
}

export type ServiceResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ServiceError;
    };

export interface AuthSessionPayload {
  user: User | null;
  session: Session | null;
}
