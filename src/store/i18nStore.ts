import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from '../config/i18n/translations';

type Language = keyof typeof translations;

interface I18nState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      t: (key: string) => {
        const { language } = get();
        const translation = translations[language] || translations.en;
        
        // Split the key into parts and traverse the translation object
        const keys = key.split('.');
        let value = translation;
        
        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) {
            console.warn(`Translation missing for key: ${key} in language: ${language}`);
            // Fallback to English if translation is missing
            value = translations.en;
            for (const fallbackKey of keys) {
              value = value?.[fallbackKey];
              if (value === undefined) break;
            }
            break;
          }
        }

        // If still undefined after fallback, return the key
        if (value === undefined) return key;
        return String(value);
      },
    }),
    {
      name: 'i18n-storage',
      version: 1,
    }
  )
);