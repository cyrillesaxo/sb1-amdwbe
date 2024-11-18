import React from 'react';
import { Chrome, MessageCircle, Facebook, Twitter } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface SocialLoginProps {
  onLogin: (provider: string) => void;
}

export function SocialLogin({ onLogin }: SocialLoginProps) {
  const { t } = useI18nStore();

  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: Chrome,
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'twitter',
      name: 'X',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-900',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {t('auth.continueWith')}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <button
              key={provider.id}
              onClick={() => onLogin(provider.id)}
              className={`flex items-center justify-center px-4 py-2 rounded-xl ${provider.color} ${provider.textColor} transition-all transform hover:scale-105`}
            >
              <Icon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{provider.name}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-center text-gray-500">
        {t('auth.privacyNotice')}
      </p>
    </div>
  );
}