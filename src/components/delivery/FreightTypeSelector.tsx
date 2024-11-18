import React from 'react';
import { Package, Truck } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

export type FreightType = 'parcel' | 'container' | 'freight';

interface FreightTypeSelectorProps {
  selectedType: FreightType;
  onSelect: (type: FreightType) => void;
}

export function FreightTypeSelector({ selectedType, onSelect }: FreightTypeSelectorProps) {
  const { t } = useI18nStore();
  
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onSelect('parcel')}
        className={`w-full flex items-center p-4 rounded-lg border ${
          selectedType === 'parcel' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <Package className="h-6 w-6 mr-3 text-blue-600" />
        <div className="text-left">
          <div className="font-medium">{t('freightType.standardParcel')}</div>
          <div className="text-sm text-gray-500">{t('freightType.smallToMediumPackages')}</div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect('container')}
        className={`w-full flex items-center p-4 rounded-lg border ${
          selectedType === 'container' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <Truck className="h-6 w-6 mr-3 text-blue-600" />
        <div className="text-left">
          <div className="font-medium">{t('freightType.fullContainer')}</div>
          <div className="text-sm text-gray-500">{t('freightType.containerSizes')}</div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect('freight')}
        className={`w-full flex items-center p-4 rounded-lg border ${
          selectedType === 'freight' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <Package className="h-6 w-6 mr-3 text-blue-600" />
        <div className="text-left">
          <div className="font-medium">{t('freightType.itemBasedFreight')}</div>
          <div className="text-sm text-gray-500">{t('freightType.bulkItemsAndCargo')}</div>
        </div>
      </button>
    </div>
  );
}
