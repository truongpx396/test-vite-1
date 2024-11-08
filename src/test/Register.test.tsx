import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';

describe('Register Component', () => {
  it('renders register form', () => {
    render(<Register />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', () => {
    render(<Register />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('shows validation error for short username', () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'ab' } });
    expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
  });

  it('shows validation errors for password requirements', () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Test minimum length
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    
    // Test number requirement
    fireEvent.change(passwordInput, { target: { value: 'longpassword' } });
    expect(screen.getByText(/password must contain at least one number/i)).toBeInTheDocument();
    
    // Test uppercase requirement
    fireEvent.change(passwordInput, { target: { value: 'longpassword1' } });
    expect(screen.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
    
    // Test special character requirement
    fireEvent.change(passwordInput, { target: { value: 'Longpassword1' } });
    expect(screen.getByText(/password must contain at least one special character/i)).toBeInTheDocument();
  });
});