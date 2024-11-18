import React from 'react';
import { ArrowLeft, Star, Shield, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Premium() {
  const navigate = useNavigate();
  const { t } = useI18nStore();

  const features = [
    {
      icon: Shield,
      title: t('premium.features.prioritySupport.title'),
      description: t('premium.features.prioritySupport.description')
    },
    {
      icon: Clock,
      title: t('premium.features.flexibleScheduling.title'),
      description: t('premium.features.flexibleScheduling.description')
    },
    {
      icon: Star,
      title: t('premium.features.premiumBenefits.title'),
      description: t('premium.features.premiumBenefits.description')
    },
    {
      icon: Zap,
      title: t('premium.features.expressDelivery.title'),
      description: t('premium.features.expressDelivery.description')
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
        <h1 className="text-2xl font-bold">{t('premium.title')}</h1>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
        <Star className="w-12 h-12 mb-4" />
        <h2 className="text-3xl font-bold mb-2">{t('premium.tryFree.title')}</h2>
        <p className="text-blue-100 mb-6">{t('premium.tryFree.subtitle')}</p>
        <button className="w-full bg-white text-blue-600 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors">
          {t('premium.tryFree.cta')}
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <Icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('premium.plans.title')}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{t('premium.plans.monthly.name')}</p>
              <p className="text-sm text-gray-500">{t('premium.plans.monthly.billing')}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{t('premium.plans.monthly.price')}</p>
              <p className="text-sm text-gray-500">{t('premium.plans.monthly.period')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
            <div>
              <p className="font-medium text-gray-900">{t('premium.plans.annual.name')}</p>
              <p className="text-sm text-gray-500">{t('premium.plans.annual.billing')}</p>
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {t('premium.plans.annual.savings')}
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{t('premium.plans.annual.price')}</p>
              <p className="text-sm text-gray-500">{t('premium.plans.annual.period')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}