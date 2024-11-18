import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from '../../../components/auth/LoginModal';
import { useI18nStore } from '../../../store/i18nStore';
import { useUser } from '../../../store/useStore';

// Mock the stores
vi.mock('../../../store/i18nStore');
vi.mock('../../../store/useStore');

describe('LoginModal', () => {
  beforeEach(() => {
    // Setup store mocks
    vi.mocked(useI18nStore).mockReturnValue({
      t: (key: string) => key,
      language: 'en',
      setLanguage: vi.fn(),
    });

    vi.mocked(useUser).mockReturnValue({
      user: null,
      login: vi.fn(),
      signup: vi.fn(),
      socialLogin: vi.fn(),
      loading: false,
      error: null,
    });
  });

  it('renders login form by default', () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText('auth.login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('auth.emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('auth.passwordPlaceholder')).toBeInTheDocument();
  });

  it('switches to signup form', () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    
    fireEvent.click(screen.getByText('auth.dontHaveAccount'));
    
    expect(screen.getByText('auth.createAccount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('auth.fullNamePlaceholder')).toBeInTheDocument();
  });

  it('validates password match on signup', async () => {
    const { login, signup } = useUser();
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    
    // Switch to signup
    fireEvent.click(screen.getByText('auth.dontHaveAccount'));
    
    // Fill form with mismatched passwords
    fireEvent.change(screen.getByPlaceholderText('auth.emailPlaceholder'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('auth.passwordPlaceholder'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('auth.confirmPasswordPlaceholder'), {
      target: { value: 'password124' }
    });
    
    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'auth.signup' }));
    
    expect(signup).not.toHaveBeenCalled();
    expect(screen.getByText('auth.errors.passwordMismatch')).toBeInTheDocument();
  });

  it('calls login function with correct credentials', async () => {
    const { login } = useUser();
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    
    fireEvent.change(screen.getByPlaceholderText('auth.emailPlaceholder'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('auth.passwordPlaceholder'), {
      target: { value: 'password123' }
    });
    
    fireEvent.submit(screen.getByRole('button', { name: 'auth.login' }));
    
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});