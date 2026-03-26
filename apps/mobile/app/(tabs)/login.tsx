import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { LoginTemplate } from '@/src/components/templates/LoginTemplate';
import { useAuthStore } from '@/src/store/auth/auth.store';

export default function LoginScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  return <LoginTemplate />;
}