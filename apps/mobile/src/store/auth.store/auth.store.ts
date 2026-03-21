import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import type { AuthSession } from '@/src/api/services/auth.service';

export const AUTH_STORAGE_KEY = 'auth:user-account-session';

type AuthStoreState = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => Promise<void>;
  clearSession: () => Promise<void>;
  hydrateSession: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  session: null,
  isAuthenticated: false,
  setSession: async (session) => {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    set({ session, isAuthenticated: true });
  },
  clearSession: async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    set({ session: null, isAuthenticated: false });
  },
  hydrateSession: async () => {
    const rawSession = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      set({ session: null, isAuthenticated: false });
      return;
    }

    const session = JSON.parse(rawSession) as AuthSession;
    set({ session, isAuthenticated: true });
  },
}));