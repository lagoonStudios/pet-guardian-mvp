import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signInWithEmail, signOut } from '@/src/api/services/auth.service';
import type { SignInWithEmailDto } from '@/src/api/services/auth.service.types';
import { authKeys } from '@/src/lib/react-query/auth-keys';
import { useAuthStore } from '@/src/store/auth/auth.store';

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (payload: SignInWithEmailDto) => {
      const result = await signInWithEmail(payload);

      if (result.error) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: (data) => {
      setSession({
        user: data.user,
        session: data.session,
      });

      queryClient.setQueryData(authKeys.session(), data.session);
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async () => {
      const result = await signOut();

      if (result.error) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: () => {
      clearSession();
      queryClient.setQueryData(authKeys.session(), null);
    },
  });
}
