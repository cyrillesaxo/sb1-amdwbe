import React, { useState } from 'react';
import { Leaf, Bike, Battery, Recycle, Sun } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface GreenOption {
  id: string;
  name: string;
  description: string;
  co2Reduction: string;
  icon: any;
  available: boolean;
}

export function GreenDeliveryOptions() {
  const { t } = useI18nStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [greenOptions] = useState<GreenOption[]>([
    {
      id: 'bike',
      name: t('greenDelivery.options.bike.name'),
      description: t('greenDelivery.options.bike.description'),
      co2Reduction: '100%',
      icon: Bike,
      available: true
    },
    {
      id: 'ev',
      name: t('greenDelivery.options.ev.name'),
      description: t('greenDelivery.options.ev.description'),
      co2Reduction: '85%',
      icon: Battery,
      available: true
    },
    {
      id: 'solar',
      name: t('greenDelivery.options.solar.name'),
      description: t('greenDelivery.options.solar.description'),
      co2Reduction: '75%',
      icon: Sun,
      available: false
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <Leaf className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">{t('greenDelivery.title')}</h2>
        </div>
        <p className="text-green-100">{t('greenDelivery.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {greenOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              disabled={!option.available}
              className={`w-full text-left p-6 rounded-xl transition-all ${
                selectedOption === option.id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-white border border-gray-200'
              } ${!option.available && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${
                  selectedOption === option.id ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    selectedOption === option.id ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{option.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  <div className="flex items-center mt-2">
                    <Recycle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      {option.co2Reduction} {t('greenDelivery.co2Reduction')}
                    </span>
                  </div>
                </div>
                {!option.available && (
                  <span className="text-sm text-gray-500">
                    {t('greenDelivery.comingSoon')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Leaf className="h-5 w-5 text-green-600 mr-2" />
          <h4 className="font-medium text-green-800">{t('greenDelivery.impact.title')}</h4>
        </div>
        <p className="text-sm text-green-700">{t('greenDelivery.impact.description')}</p>
      </div>

      {selectedOption && (
        <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
          {t('greenDelivery.select')}
        </button>
      )}
    </div>
  );
}