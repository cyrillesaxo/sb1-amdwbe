import React from 'react';
import { Globe, Check, X } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageSelector({ isOpen, onClose }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18nStore();

  if (!isOpen) return null;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yorùbá' },
    { code: 'zu', name: 'isiZulu' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t('common.language')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                onClose();
              }}
              className={`flex items-center justify-between w-full p-3 rounded-lg ${
                language === lang.code
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span>{lang.name}</span>
              {language === lang.code && (
                <Check className="h-5 w-5 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}