import React from 'react';
import { GroupDeliveryCoordinator } from '../business/GroupDeliveryCoordinator';
import { CommunityPickupPoints } from '../business/CommunityPickupPoints';
import { useI18nStore } from '../../store/i18nStore';

export function BusinessHub() {
  const { t } = useI18nStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('business.title')}</h1>
      
      <div className="space-y-8">
        <section>
          <GroupDeliveryCoordinator />
        </section>

        <section>
          <CommunityPickupPoints />
        </section>
      </div>
    </div>
  );
}