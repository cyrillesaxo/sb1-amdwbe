import React from 'react';
import { useI18nStore } from '../../store/i18nStore';
import { PlatformIntegration } from './PlatformIntegration';
import { PostalServiceIntegration } from './PostalServiceIntegration';

export default function IntegrationSettings() {
  const { t } = useI18nStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('integration.title')}</h2>
      <div className="space-y-8">
        <PlatformIntegration />
        <PostalServiceIntegration />
      </div>
    </div>
  );
}