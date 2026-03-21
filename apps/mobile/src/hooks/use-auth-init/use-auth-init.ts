import { useEffect } from 'react';

import { getSession } from "@/src/services/auth/auth.service";
import { useAuthStore } from '@/src/store/auth/auth.store';
import { supabase } from "@/src/lib/supabase";

export function useAuthInit() {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    let isMounted = true;

    async function syncInitialSession() {
      const result = await getSession();

      if (!isMounted) {
        return;
      }

      if (result.error || !result.data.session) {
        clearSession();
        return;
      }

      setSession({
        user: result.data.user,
        session: result.data.session,
      });
    }

    void syncInitialSession();

    const authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        clearSession();
        return;
      }

      setSession({
        user: session.user,
        session,
      });
    });

    return () => {
      isMounted = false;
      authSubscription.data.subscription.unsubscribe();
    };
  }, [clearSession, setSession]);
}
