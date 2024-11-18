import { StateCreator } from 'zustand';
import { Theme, Language } from '../../types';

export interface SettingsSlice {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'light',
  language: 'en',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
});