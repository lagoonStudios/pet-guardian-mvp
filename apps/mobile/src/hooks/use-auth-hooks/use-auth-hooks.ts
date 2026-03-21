import { useMutation } from '@tanstack/react-query';

import { signInWithPassword } from '@/src/api/services/auth.service';
import { useAuthStore } from '@/src/store/auth.store';

export type SignInInput = {
  email: string;
  password: string;
};

export const useSignInMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: ({ email, password }: SignInInput) => signInWithPassword({ email, password }),
    onSuccess: async (result) => {
      if (result.data) {
        await setSession(result.data);
      }
    },
  });
};