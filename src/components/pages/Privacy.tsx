import React from 'react';
import { ArrowLeft, Lock, Eye, Bell, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Privacy() {
  const navigate = useNavigate();
  const { t } = useI18nStore();

  const privacySettings = [
    {
      icon: Lock,
      title: t('privacy.sections.accountPrivacy.title'),
      description: t('privacy.sections.accountPrivacy.description'),
      options: [
        { 
          label: t('privacy.sections.accountPrivacy.options.profileVisibility'), 
          value: 'Public' 
        },
        { 
          label: t('privacy.sections.accountPrivacy.options.activityStatus'), 
          value: 'Contacts only' 
        }
      ]
    },
    {
      icon: Eye,
      title: t('privacy.sections.dataVisibility.title'),
      description: t('privacy.sections.dataVisibility.description'),
      options: [
        { 
          label: t('privacy.sections.dataVisibility.options.phoneNumber'), 
          value: 'Hidden' 
        },
        { 
          label: t('privacy.sections.dataVisibility.options.emailAddress'), 
          value: 'Contacts only' 
        }
      ]
    },
    {
      icon: Bell,
      title: t('privacy.sections.communication.title'),
      description: t('privacy.sections.communication.description'),
      options: [
        { 
          label: t('privacy.sections.communication.options.marketingEmails'), 
          value: 'Off' 
        },
        { 
          label: t('privacy.sections.communication.options.pushNotifications'), 
          value: 'On' 
        }
      ]
    },
    {
      icon: Share2,
      title: t('privacy.sections.dataSharing.title'),
      description: t('privacy.sections.dataSharing.description'),
      options: [
        { 
          label: t('privacy.sections.dataSharing.options.locationSharing'), 
          value: 'While using' 
        },
        { 
          label: t('privacy.sections.dataSharing.options.usageStats'), 
          value: 'Off' 
        }
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/account')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{t('privacy.title')}</h1>
          <p className="text-gray-500">{t('privacy.subtitle')}</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-6">
        {privacySettings.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.options.map((option) => (
                  <div key={option.label} className="flex items-center justify-between">
                    <span className="text-gray-700">{option.label}</span>
                    <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                      {option.value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Export */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          {t('privacy.dataExport.title')}
        </h3>
        <p className="text-sm text-blue-700 mb-4">
          {t('privacy.dataExport.description')}
        </p>
        <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {t('privacy.dataExport.button')}
        </button>
      </div>
    </div>
  );
}