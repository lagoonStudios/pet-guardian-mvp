import { render, screen, fireEvent } from '@testing-library/react-native';
import { describe, it, expect, vi } from 'vitest';

import { LoginTemplate } from './LoginTemplate';

describe('LoginTemplate', () => {
  it('renders title, subtitle, and LoginForm', () => {
    const mockOnLogin = vi.fn();
    render(<LoginTemplate onLogin={mockOnLogin} />);

    expect(screen.getByText('Enterprise Dashboard Access')).toBeTruthy();
    expect(screen.getByText('Sign in with your enterprise credentials')).toBeTruthy();
    expect(screen.getByLabelText('Work email')).toBeTruthy();
  });

  it('calls onLogin when form is submitted', () => {
    const mockOnLogin = vi.fn();
    render(<LoginTemplate onLogin={mockOnLogin} />);

    const emailInput = screen.getByLabelText('Work email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(submitButton);

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});