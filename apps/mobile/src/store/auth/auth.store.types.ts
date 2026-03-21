import type { Session, User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setSession: (payload: { user: User | null; session: Session | null }) => void;
  clearSession: () => void;
}

export type AuthStore = AuthState & AuthActions;
