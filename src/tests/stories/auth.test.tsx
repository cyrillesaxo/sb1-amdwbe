import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginModal } from '../../components/auth/LoginModal';
import { useUser } from '../../store/useStore';
import { useI18nStore } from '../../store/i18nStore';

// Mock the stores
vi.mock('../../store/useStore');
vi.mock('../../store/i18nStore');

describe('Authentication User Stories', () => {
  beforeEach(() => {
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

  // Story: "As a User, I want to register and set up my profile"
  describe('User Registration', () => {
    it('allows user to register with required information', async () => {
      const { signup } = useUser();
      render(<LoginModal isOpen={true} onClose={() => {}} />);

      // Switch to signup mode
      fireEvent.click(screen.getByText('auth.dontHaveAccount'));

      // Fill registration form
      fireEvent.change(screen.getByPlaceholderText('auth.fullNamePlaceholder'), {
        target: { value: 'John Doe' }
      });
      fireEvent.change(screen.getByPlaceholderText('auth.emailPlaceholder'), {
        target: { value: 'john@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('auth.passwordPlaceholder'), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByPlaceholderText('auth.confirmPasswordPlaceholder'), {
        target: { value: 'password123' }
      });

      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: 'auth.signup' }));

      expect(signup).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'password123',
        'sender'
      );
    });

    it('validates required fields during registration', async () => {
      const { signup } = useUser();
      render(<LoginModal isOpen={true} onClose={() => {}} />);

      // Switch to signup mode
      fireEvent.click(screen.getByText('auth.dontHaveAccount'));

      // Submit without filling form
      fireEvent.submit(screen.getByRole('button', { name: 'auth.signup' }));

      expect(signup).not.toHaveBeenCalled();
      expect(screen.getByText('auth.errors.requiredFields')).toBeInTheDocument();
    });
  });

  // Story: "As a User, I want to log in using my social media account"
  describe('Social Media Login', () => {
    it('allows login with social media providers', async () => {
      const { socialLogin } = useUser();
      render(<LoginModal isOpen={true} onClose={() => {}} />);

      // Click Google login button
      fireEvent.click(screen.getByText('Google'));

      expect(socialLogin).toHaveBeenCalledWith('google');
    });

    it('handles social login errors gracefully', async () => {
      const { socialLogin } = useUser();
      vi.mocked(socialLogin).mockRejectedValue(new Error('Connection failed'));
      
      render(<LoginModal isOpen={true} onClose={() => {}} />);

      // Click Google login button
      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        expect(screen.getByText('auth.errors.socialLoginFailed')).toBeInTheDocument();
      });
    });
  });

  // Story: "As a User, I want to reset my password if I forget it"
  describe('Password Reset', () => {
    it('allows user to request password reset', async () => {
      const mockResetPassword = vi.fn();
      vi.mocked(useUser).mockReturnValue({
        ...useUser(),
        resetPassword: mockResetPassword,
      });

      render(<LoginModal isOpen={true} onClose={() => {}} />);

      // Click forgot password link
      fireEvent.click(screen.getByText('auth.forgotPassword'));

      // Enter email
      fireEvent.change(screen.getByPlaceholderText('auth.emailPlaceholder'), {
        target: { value: 'john@example.com' }
      });

      // Submit reset request
      fireEvent.click(screen.getByText('auth.sendResetLink'));

      expect(mockResetPassword).toHaveBeenCalledWith('john@example.com');
    });
  });

  // Story: "As a Guest User, I want to check the price for a delivery"
  describe('Guest Price Check', () => {
    it('allows guests to calculate delivery price', async () => {
      const mockCalculatePrice = vi.fn().mockResolvedValue({
        price: 5000,
        currency: 'FCFA'
      });

      vi.mocked(useUser).mockReturnValue({
        ...useUser(),
        calculateDeliveryPrice: mockCalculatePrice,
      });

      render(<DeliveryCalculator />);

      // Enter delivery details
      fireEvent.change(screen.getByPlaceholderText('delivery.pickupLocation'), {
        target: { value: 'Douala Central Market' }
      });
      fireEvent.change(screen.getByPlaceholderText('delivery.dropoffLocation'), {
        target: { value: 'Bonapriso Mall' }
      });

      // Calculate price
      fireEvent.click(screen.getByText('delivery.calculatePrice'));

      await waitFor(() => {
        expect(screen.getByText('5,000 FCFA')).toBeInTheDocument();
      });
    });
  });
});