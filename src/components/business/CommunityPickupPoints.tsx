import React, { useState } from 'react';
import { Store, MapPin, Clock, Users, Star } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface PickupPoint {
  id: string;
  name: string;
  address: string;
  hours: string;
  rating: number;
  totalPackages: number;
  type: 'shop' | 'market' | 'community';
}

export function CommunityPickupPoints() {
  const { t } = useI18nStore();
  const [pickupPoints] = useState<PickupPoint[]>([
    {
      id: 'p1',
      name: "Marie's Shop",
      address: 'Marché Central, Douala',
      hours: '07:00 - 19:00',
      rating: 4.8,
      totalPackages: 1250,
      type: 'shop'
    },
    {
      id: 'p2',
      name: 'Bonapriso Community Center',
      address: 'Rue des Manguiers, Bonapriso',
      hours: '08:00 - 18:00',
      rating: 4.9,
      totalPackages: 2100,
      type: 'community'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">{t('pickupPoints.title')}</h2>
        <p className="text-green-100">{t('pickupPoints.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {pickupPoints.map((point) => (
          <div key={point.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <Store className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">{point.name}</h3>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{point.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    {point.totalPackages.toLocaleString()} {t('pickupPoints.packages')}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                point.type === 'community' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {t(`pickupPoints.types.${point.type}`)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{point.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{point.hours}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{t('pickupPoints.availableNow')}</span>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                {t('pickupPoints.select')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
        {t('pickupPoints.suggestLocation')}
      </button>
    </div>
  );
}