import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SafeAreaView, Text, View } from '@/src/components/atoms';
import { LoginForm } from '@/src/components/organisms';
import { styles } from './LoginTemplate.styles';
import { type LoginTemplateProps } from './LoginTemplate.types';

export function LoginTemplate({ onLogin }: LoginTemplateProps) {
  // --- Hooks -----------------------------------------------------------------
  const { t } = useTranslation('auth');
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const handleLogin = (credentials: { email: string; password: string }) => {
    // Mock login: just alert for now
    alert(`Logged in as ${credentials.email}`);
    onLogin?.(credentials);
  };
  // --- END: Data and handlers ------------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text type="title">{t((($) => $.auth.login.title))}</Text>
        <Text>{t((($) => $.auth.login.subtitle))}</Text>
        <LoginForm onSubmit={handleLogin} />
      </ScrollView>
    </SafeAreaView>
  );
}