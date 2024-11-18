import React from 'react';
import { Moon, Sun, Monitor, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useI18nStore } from '../../store/i18nStore';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { theme, setTheme } = useThemeStore();
  const { t } = useI18nStore();

  if (!isOpen) return null;

  const themes = [
    {
      id: 'light',
      name: t('theme.light'),
      icon: Sun,
      description: t('theme.lightDescription')
    },
    {
      id: 'dark',
      name: t('theme.dark'),
      icon: Moon,
      description: t('theme.darkDescription')
    },
    {
      id: 'system',
      name: t('theme.system'),
      icon: Monitor,
      description: t('theme.systemDescription')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('theme.title')}
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {themes.map(({ id, name, icon: Icon, description }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setTheme(id as 'light' | 'dark' | 'system');
                      onClose();
                    }}
                    className={`relative flex items-center p-4 rounded-lg border transition-all ${
                      theme === id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${
                      theme === id ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <div className="ml-4 flex-1 text-left">
                      <p className="font-medium text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    {theme === id && (
                      <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}