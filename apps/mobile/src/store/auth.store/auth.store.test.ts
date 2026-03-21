import AsyncStorage from '@react-native-async-storage/async-storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AUTH_STORAGE_KEY, useAuthStore } from './auth.store';

describe('auth.store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ session: null, isAuthenticated: false });
  });

  it('setSession persists data and updates authentication state', async () => {
    const session = {
      accessToken: 'enterprise-access-token',
      refreshToken: 'enterprise-refresh-token',
      userId: 'user-account-100',
    };

    await useAuthStore.getState().setSession(session);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY, JSON.stringify(session));
    expect(useAuthStore.getState().session).toEqual(session);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('clearSession resets to initial values and clears persistence', async () => {
    await useAuthStore.getState().setSession({
      accessToken: 'enterprise-access-token',
      refreshToken: 'enterprise-refresh-token',
      userId: 'user-account-100',
    });

    await useAuthStore.getState().clearSession();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY);
    expect(useAuthStore.getState().session).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('isAuthenticated reflects session presence', async () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    await useAuthStore.getState().setSession({
      accessToken: 'enterprise-access-token',
      refreshToken: 'enterprise-refresh-token',
      userId: 'user-account-100',
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    await useAuthStore.getState().clearSession();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});