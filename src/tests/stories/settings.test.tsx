import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSettings } from '../../components/settings/ThemeSettings';
import { LanguageSettings } from '../../components/settings/LanguageSettings';
import { useThemeStore } from '../../store/themeStore';
import { useI18nStore } from '../../store/i18nStore';

vi.mock('../../store/themeStore');
vi.mock('../../store/i18nStore');

describe('Settings User Stories', () => {
  // Story: "As a User, I want to switch between dark and light themes"
  describe('Theme Settings', () => {
    it('allows users to switch themes', () => {
      const mockSetTheme = vi.fn();
      vi.mocked(useThemeStore).mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme
      });

      render(<ThemeSettings />);

      fireEvent.click(screen.getByText('theme.dark'));

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('persists theme preference', () => {
      const mockSetTheme = vi.fn();
      vi.mocked(useThemeStore).mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme
      });

      render(<ThemeSettings />);

      expect(screen.getByText('theme.dark')).toHaveAttribute('aria-selected', 'true');
    });
  });

  // Story: "As a User, I want to use the app in my preferred language"
  describe('Language Settings', () => {
    it('allows users to change language', () => {
      const mockSetLanguage = vi.fn();
      vi.mocked(useI18nStore).mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: (key: string) => key
      });

      render(<LanguageSettings />);

      fireEvent.click(screen.getByText('Français'));

      expect(mockSetLanguage).toHaveBeenCalledWith('fr');
    });

    it('displays content in selected language', () => {
      vi.mocked(useI18nStore).mockReturnValue({
        language: 'fr',
        setLanguage: vi.fn(),
        t: (key: string) => key === 'common.language' ? 'Langue' : key
      });

      render(<LanguageSettings />);

      expect(screen.getByText('Langue')).toBeInTheDocument();
    });
  });
});