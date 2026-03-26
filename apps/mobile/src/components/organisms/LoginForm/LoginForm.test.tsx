import { render, screen, fireEvent } from '@testing-library/react-native';
import { describe, it, expect, vi } from 'vitest';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders email and password inputs and submit button', () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Work email')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByText('Sign in')).toBeTruthy();
  });

  it('calls onSubmit with credentials when form is submitted', () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('shows error message when error prop is provided', () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} error="Invalid credentials" />);

    expect(screen.getByText('Invalid credentials')).toBeTruthy();
  });

  it('shows validation error for invalid email and does not submit', async () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/email must be a valid email/i)).toBeTruthy();
  });

  it('shows validation error for short password and does not submit', async () => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeTruthy();
  });
});