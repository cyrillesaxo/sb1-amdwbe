import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from '../../components/layout/LanguageSelector';
import { useI18nStore } from '../../store/i18nStore';

vi.mock('../../store/i18nStore');

describe('Cultural & Language Features', () => {
  it('supports multiple regional languages', () => {
    const mockSetLanguage = vi.fn();
    vi.mocked(useI18nStore).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
      t: (key: string) => key,
      availableLanguages: [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'sw', name: 'Kiswahili' }
      ]
    });

    render(<LanguageSelector />);
    
    fireEvent.click(screen.getByText('Français'));
    expect(mockSetLanguage).toHaveBeenCalledWith('fr');
  });

  it('adapts to local business practices', () => {
    const mockSetBusinessHours = vi.fn();
    vi.mocked(useI18nStore).mockReturnValue({
      setBusinessHours: mockSetBusinessHours,
      businessHours: {
        start: '08:00',
        end: '18:00',
        weekends: false
      }
    });

    render(<BusinessSettings />);
    
    fireEvent.change(screen.getByLabelText('business.hours.start'), {
      target: { value: '09:00' }
    });
    
    expect(mockSetBusinessHours).toHaveBeenCalledWith(expect.objectContaining({
      start: '09:00'
    }));
  });
});