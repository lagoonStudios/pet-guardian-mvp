import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import { PropsWithChildren, createElement } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { signInWithPassword } from '@/src/api/services/auth.service';
import { useAuthStore } from '@/src/store/auth.store';
import { useSignInMutation } from './use-auth-hooks';

vi.mock('@/src/api/services/auth.service', () => ({
  signInWithPassword: vi.fn(),
}));

describe('use-auth-hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ session: null, isAuthenticated: false });
  });

  it('useSignInMutation triggers service and updates store on success', async () => {
    vi.mocked(signInWithPassword).mockResolvedValue({
      data: {
        accessToken: 'enterprise-access-token',
        refreshToken: 'enterprise-refresh-token',
        userId: 'user-account-100',
      },
      error: null,
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(() => useSignInMutation(), { wrapper });

    await result.current.mutateAsync({
      email: 'user.account@enterprise-auth.io',
      password: 'secure-password',
    });

    expect(signInWithPassword).toHaveBeenCalledWith({
      email: 'user.account@enterprise-auth.io',
      password: 'secure-password',
    });

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().session?.userId).toBe('user-account-100');
    });
  });
});