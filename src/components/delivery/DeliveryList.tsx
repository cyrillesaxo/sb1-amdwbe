import React from 'react';
import { useDeliveryStore } from '../../store/useStore';
import { useI18nStore } from '../../store/i18nStore';
import { DeliveryCard } from './DeliveryCard';

export function DeliveryList() {
  const { deliveries } = useDeliveryStore();
  const { t } = useI18nStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('delivery.activeDeliveries')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery) => (
          <DeliveryCard key={delivery.id} delivery={delivery} />
        ))}
      </div>
    </div>
  );
}