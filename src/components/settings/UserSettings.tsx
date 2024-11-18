import React from 'react';
import { useI18nStore } from '../../store/i18nStore';
import { ThemeSettings } from './ThemeSettings';
import { LanguageSettings } from './LanguageSettings';

export default function UserSettings() {
  const { t } = useI18nStore();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h2>
      <ThemeSettings />
      <LanguageSettings />
    </div>
  );
}