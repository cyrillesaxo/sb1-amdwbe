import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface SecurityState {
  mfaEnabled: boolean;
  biometricEnabled: boolean;
  deviceFingerprint: string | null;
  loginAttempts: number;
  lastLoginAttempt: number;
  sessionTimeout: number;
  enableMFA: (type: 'sms' | 'email') => Promise<void>;
  enableBiometric: () => Promise<void>;
  verifyMFA: (code: string) => Promise<boolean>;
  handleSessionTimeout: () => void;
  resetLoginAttempts: () => void;
  incrementLoginAttempts: () => boolean;
  getDeviceFingerprint: () => Promise<string>;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useSecurityStore = create<SecurityState>()(
  persist(
    (set, get) => ({
      mfaEnabled: false,
      biometricEnabled: false,
      deviceFingerprint: null,
      loginAttempts: 0,
      lastLoginAttempt: 0,
      sessionTimeout: SESSION_TIMEOUT,

      enableMFA: async (type) => {
        // Implementation would include:
        // 1. Server request to enable MFA
        // 2. QR code generation for authenticator apps
        // 3. Phone number/email verification
        set({ mfaEnabled: true });
      },

      enableBiometric: async () => {
        if (!window.PublicKeyCredential) {
          throw new Error('Biometric authentication not supported');
        }
        // Implementation would include WebAuthn registration
        set({ biometricEnabled: true });
      },

      verifyMFA: async (code) => {
        // Verify MFA code with server
        return true;
      },

      handleSessionTimeout: () => {
        // Clear sensitive data and redirect to login
        window.dispatchEvent(new Event('sessionTimeout'));
      },

      resetLoginAttempts: () => {
        set({ loginAttempts: 0, lastLoginAttempt: Date.now() });
      },

      incrementLoginAttempts: () => {
        const { loginAttempts, lastLoginAttempt } = get();
        const now = Date.now();

        // Reset if lockout period has passed
        if (now - lastLoginAttempt > LOCKOUT_DURATION) {
          set({ loginAttempts: 1, lastLoginAttempt: now });
          return true;
        }

        // Increment attempts
        const newAttempts = loginAttempts + 1;
        set({ loginAttempts: newAttempts, lastLoginAttempt: now });

        // Return false if max attempts exceeded
        return newAttempts <= MAX_LOGIN_ATTEMPTS;
      },

      getDeviceFingerprint: async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const fingerprint = result.visitorId;
        set({ deviceFingerprint: fingerprint });
        return fingerprint;
      },
    }),
    {
      name: 'security-store',
      partialize: (state) => ({
        mfaEnabled: state.mfaEnabled,
        biometricEnabled: state.biometricEnabled,
        deviceFingerprint: state.deviceFingerprint,
      }),
    }
  )
);