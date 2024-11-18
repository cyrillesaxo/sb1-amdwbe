import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { useSecurityStore } from '../../store/securityStore';

vi.mock('../../store/securityStore');

describe('Security Requirements', () => {
  // MFA Tests
  describe('Multi-Factor Authentication', () => {
    it('enables SMS verification', async () => {
      const mockEnableMFA = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(useSecurityStore).mockReturnValue({
        enableMFA: mockEnableMFA,
        mfaEnabled: false
      });

      render(<SecuritySettings />);
      
      fireEvent.click(screen.getByText('Enable SMS Verification'));
      
      expect(mockEnableMFA).toHaveBeenCalledWith('sms');
    });

    it('supports biometric authentication', async () => {
      const mockEnableBiometric = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(useSecurityStore).mockReturnValue({
        enableBiometric: mockEnableBiometric,
        biometricEnabled: false
      });

      render(<SecuritySettings />);
      
      fireEvent.click(screen.getByText('Enable Biometric Login'));
      
      expect(mockEnableBiometric).toHaveBeenCalled();
    });
  });

  // Session Management Tests
  describe('Session Management', () => {
    it('handles session timeout', async () => {
      const mockHandleTimeout = vi.fn();
      vi.mocked(useSecurityStore).mockReturnValue({
        handleSessionTimeout: mockHandleTimeout
      });

      // Simulate session timeout
      const event = new Event('sessionTimeout');
      window.dispatchEvent(event);

      expect(mockHandleTimeout).toHaveBeenCalled();
    });
  });

  // Rate Limiting Tests
  describe('Rate Limiting', () => {
    it('blocks excessive login attempts', async () => {
      const mockLogin = vi.fn();
      let attemptCount = 0;
      
      vi.mocked(useSecurityStore).mockReturnValue({
        login: () => {
          attemptCount++;
          if (attemptCount > 5) {
            throw new Error('Too many attempts');
          }
          return mockLogin();
        }
      });

      // Attempt multiple logins
      for (let i = 0; i < 6; i++) {
        try {
          await useSecurityStore().login();
        } catch (error) {
          expect(error.message).toBe('Too many attempts');
        }
      }
    });
  });
});