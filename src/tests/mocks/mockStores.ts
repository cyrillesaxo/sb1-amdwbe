import { vi } from 'vitest';
import { mockUser, mockTheme } from './mockData';

export const mockUseUser = () => ({
  user: mockUser,
  login: vi.fn(),
  logout: vi.fn(),
  signup: vi.fn(),
  loading: false,
  error: null
});

export const mockUseTheme = () => ({
  ...mockTheme,
  setTheme: vi.fn(),
  toggleTheme: vi.fn()
});

export const mockUseI18n = () => ({
  language: 'en',
  setLanguage: vi.fn(),
  t: (key: string) => key
});