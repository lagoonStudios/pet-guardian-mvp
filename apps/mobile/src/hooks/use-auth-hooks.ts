import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";

import { signInWithEmail, signOut } from "@/src/services/auth/auth.service";
import { translateAuthError } from "@/src/utils/translate-auth-error";
import { authKeys } from '@/src/lib/react-query/auth-keys';
import { useAuthStore } from '@/src/store/auth/auth.store';
import { SignInWithEmailDto } from "@/src/services/auth";

export function useSignInMutation() {
  const { t } = useTranslation(["errors"]);
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (payload: SignInWithEmailDto) => {
      const result = await signInWithEmail(payload);

      if (result.error) {
        throw {
          ...result.error,
          message: translateAuthError(t, result.error.code, result.error.message),
        };
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
  const { t } = useTranslation(["errors"]);
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async () => {
      const result = await signOut();

      if (result.error) {
        throw {
          ...result.error,
          message: translateAuthError(t, result.error.code, result.error.message),
        };
      }

      return result.data;
    },
    onSuccess: () => {
      clearSession();
      queryClient.setQueryData(authKeys.session(), null);
    },
  });
}
