export interface LoginTemplateProps {
  onLogin?: (credentials: { email: string; password: string }) => void;
}