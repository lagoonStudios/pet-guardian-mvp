import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { Button, Input, Text, View } from '@/src/components/atoms';
import { signInDtoSchema } from '@/src/services/auth/auth.service.constants';
import { getLoginFormStyles } from './LoginForm.styles';
import { type LoginCredentials, type LoginFormProps } from './LoginForm.types';

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  // --- Hooks -----------------------------------------------------------------
  const { t } = useTranslation('auth');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(signInDtoSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const styles = getLoginFormStyles();

  const onFormSubmit = (values: LoginCredentials) => {
    onSubmit(values);
  };
  // --- END: Data and handlers ------------------------------------------------

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label={t((($) => $.auth.login.email_label))}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text type="defaultSemiBold" style={{ color: 'red', marginBottom: 8 }}>
                {errors.email.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label={t((($) => $.auth.login.password_label))}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text type="defaultSemiBold" style={{ color: 'red', marginBottom: 8 }}>
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      {error && (
        <Text type="defaultSemiBold" style={{ color: 'red', marginBottom: 8 }}>
          {error}
        </Text>
      )}

      <Button mode="contained" onPress={handleSubmit(onFormSubmit)} loading={loading} disabled={!isValid || loading}>
        {t((($) => $.auth.login.submit))}
      </Button>
    </View>
  );
}