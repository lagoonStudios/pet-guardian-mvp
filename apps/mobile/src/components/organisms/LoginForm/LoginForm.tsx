import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Input, Text, View } from '@/src/components/atoms';
import { getLoginFormStyles } from './LoginForm.styles';
import { type LoginFormProps } from './LoginForm.types';

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  // --- Hooks -----------------------------------------------------------------
  const { t } = useTranslation('auth');
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const styles = getLoginFormStyles();

  const handleSubmit = () => {
    if (email && password) {
      onSubmit({ email, password });
    }
  };
  // --- END: Data and handlers ------------------------------------------------

  return (
    <View style={styles.container}>
      <Input
        label={t((($) => $.auth.login.email_label))}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label={t((($) => $.auth.login.password_label))}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text type="defaultSemiBold" style={{ color: 'red' }}>{error}</Text>}
      <Button mode="contained" onPress={handleSubmit} loading={loading}>
        {t((($) => $.auth.login.submit))}
      </Button>
    </View>
  );
}