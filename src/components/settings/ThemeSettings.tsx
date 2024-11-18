import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useI18nStore } from '../../store/i18nStore';
import { ColorPicker } from './ColorPicker';

export function ThemeSettings() {
  const { theme, customColors, setTheme, setCustomColor } = useThemeStore();
  const { t } = useI18nStore();

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('settings.theme.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.theme.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                theme === 'light'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {theme === 'light' ? (
                <>
                  <Sun className="h-5 w-5 mr-2" />
                  <span>{t('settings.theme.lightMode')}</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-2" />
                  <span>{t('settings.theme.darkMode')}</span>
                </>
              )}
            </button>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <ColorPicker
            label={t('settings.theme.colors.primary')}
            colorKey="primary"
            initialColor={customColors.primary}
          />
          <ColorPicker
            label={t('settings.theme.colors.secondary')}
            colorKey="secondary"
            initialColor={customColors.secondary}
          />
          <ColorPicker
            label={t('settings.theme.colors.accent')}
            colorKey="accent"
            initialColor={customColors.accent}
          />
          <ColorPicker
            label={t('settings.theme.colors.background')}
            colorKey="background"
            initialColor={customColors.background}
          />
          <ColorPicker
            label={t('settings.theme.colors.text')}
            colorKey="text"
            initialColor={customColors.text}
          />
        </div>
      </div>
    </div>
  );
}