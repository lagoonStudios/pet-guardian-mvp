import { LoginTemplate } from '@/src/components/templates/LoginTemplate';

export default function LoginScreen() {
  const handleLogin = (credentials: { email: string; password: string }) => {
    // TODO: Integrate with auth store or navigation
    console.log('Login attempt:', credentials);
  };

  return <LoginTemplate onLogin={handleLogin} />;
}