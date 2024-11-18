import React, { useState } from 'react';
import { Users, Package, MapPin, Calendar } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface GroupDelivery {
  id: string;
  route: string;
  date: string;
  capacity: number;
  participants: number;
  pricePerParticipant: number;
}

export function GroupDeliveryCoordinator() {
  const { t } = useI18nStore();
  const [activeGroups, setActiveGroups] = useState<GroupDelivery[]>([
    {
      id: 'g1',
      route: 'Douala Central Market → Bonapriso',
      date: '2024-03-20',
      capacity: 10,
      participants: 6,
      pricePerParticipant: 2000
    },
    {
      id: 'g2',
      route: 'Akwa Market → Bonanjo',
      date: '2024-03-21',
      capacity: 8,
      participants: 4,
      pricePerParticipant: 2500
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">{t('groupDelivery.title')}</h2>
        <p className="text-purple-100">{t('groupDelivery.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {activeGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">{group.route}</h3>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {group.participants}/{group.capacity} {t('groupDelivery.spots')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(group.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Package className="h-5 w-5 mr-2" />
                <span>{group.pricePerParticipant} FCFA {t('groupDelivery.perPerson')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(Math.min(group.participants, 5))].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  >
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                ))}
                {group.participants > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{group.participants - 5}</span>
                  </div>
                )}
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                {t('groupDelivery.join')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
        {t('groupDelivery.createNew')}
      </button>
    </div>
  );
}