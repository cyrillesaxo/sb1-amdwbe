import React from 'react';
import { Globe } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import { useUser } from '../../store/useStore';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'zu', name: 'isiZulu' }
];

export function LanguageSettings() {
  const { t } = useI18nStore();
  const { user } = useUser();
  const currentLanguage = user?.preferences?.language || 'en';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          {t('settings.language')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
              currentLanguage === lang.code
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <span className="font-medium text-gray-900">{lang.name}</span>
            {currentLanguage === lang.code && (
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}