import React from 'react';
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Help() {
  const navigate = useNavigate();
  const { t } = useI18nStore();

  const helpTopics = [
    {
      icon: MessageCircle,
      title: t('help.topics.liveChat.title'),
      description: t('help.topics.liveChat.description'),
      status: t('help.topics.liveChat.status'),
      statusColor: 'text-green-600'
    },
    {
      icon: Phone,
      title: t('help.topics.phone.title'),
      description: t('help.topics.phone.description'),
      status: t('help.topics.phone.status'),
      statusColor: 'text-blue-600'
    },
    {
      icon: Mail,
      title: t('help.topics.email.title'),
      description: t('help.topics.email.description'),
      status: t('help.topics.email.status'),
      statusColor: 'text-purple-600'
    },
    {
      icon: FileText,
      title: t('help.topics.faqs.title'),
      description: t('help.topics.faqs.description'),
      badge: t('help.topics.faqs.badge')
    },
    {
      icon: HelpCircle,
      title: t('help.topics.helpCenter.title'),
      description: t('help.topics.helpCenter.description')
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
        <h1 className="text-2xl font-bold">{t('help.title')}</h1>
      </div>

      {/* Help Topics */}
      <div className="space-y-4">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.title}
              className="w-full flex items-center p-6 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-all"
            >
              <Icon className="w-8 h-8 text-blue-600 mr-4" />
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">{topic.title}</h3>
                <p className="text-sm text-gray-500">{topic.description}</p>
              </div>
              {topic.status && (
                <span className={`text-sm font-medium ${topic.statusColor}`}>
                  {topic.status}
                </span>
              )}
              {topic.badge && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {topic.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Emergency Support */}
      <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
        <h3 className="text-lg font-medium text-red-900 mb-2">{t('help.emergency.title')}</h3>
        <p className="text-sm text-red-700 mb-4">
          {t('help.emergency.description')}
        </p>
        <button className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
          {t('help.emergency.button')}
        </button>
      </div>
    </div>
  );
}