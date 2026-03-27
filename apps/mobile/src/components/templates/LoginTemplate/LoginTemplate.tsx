import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SafeAreaView, Text, View } from '@/src/components/atoms';
import { LoginForm } from '@/src/components/organisms';
import { useSignInMutation } from '@/src/hooks/use-auth-hooks/use-auth-hooks';
import { styles } from './LoginTemplate.styles';
import { type LoginTemplateProps } from './LoginTemplate.types';

export function LoginTemplate({ onLogin }: LoginTemplateProps) {
  // --- Hooks -----------------------------------------------------------------
  const { t } = useTranslation('auth');
  const signInMutation = useSignInMutation();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state --------------------------------------------------------------
  const isLoading = signInMutation.isPending;
  const authError = signInMutation.isError
    ? (signInMutation.error as { message?: string })?.message ?? t((($) => $.auth.errors.invalid_credentials))
    : undefined;
  // --- END: Local state ---------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const handleLogin = (credentials: { email: string; password: string }) => {
    signInMutation.mutate(credentials, {
      onSuccess: () => {
        onLogin?.(credentials);
      },
    });
  };
  // --- END: Data and handlers ------------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text type="title">{t((($) => $.auth.login.title))}</Text>
        <Text>{t((($) => $.auth.login.subtitle))}</Text>
        <LoginForm onSubmit={handleLogin} loading={isLoading} error={authError} />
      </ScrollView>
    </SafeAreaView>
  );
}