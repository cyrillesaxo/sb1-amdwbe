import React from 'react';
import { X, Globe, FileText, FileCheck, Navigation2 } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface MoreInfoPopupProps {
  type: 'customs' | 'document' | 'quote' | 'carrier';
  onClose: () => void;
}

export function MoreInfoPopup({ type, onClose }: MoreInfoPopupProps) {
  const { t } = useI18nStore();

  const renderContent = () => {
    switch (type) {
      case 'customs':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.customs.type')}
              </label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="commercial">{t('delivery.customs.commercial')}</option>
                <option value="personal">{t('delivery.customs.personal')}</option>
                <option value="gift">{t('delivery.customs.gift')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.customs.value')}
              </label>
              <input
                type="number"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('delivery.customs.valuePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.customs.description')}
              </label>
              <textarea
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('delivery.customs.descriptionPlaceholder')}
              />
            </div>
          </div>
        );

      case 'document':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700">
                    {t('delivery.document.upload')}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t('delivery.document.allowedTypes')}
              </p>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.quote.service')}
              </label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="standard">{t('delivery.quote.standard')}</option>
                <option value="express">{t('delivery.quote.express')}</option>
                <option value="same-day">{t('delivery.quote.sameDay')}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('delivery.quote.weight')}
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('delivery.quote.distance')}
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="km"
                />
              </div>
            </div>
          </div>
        );

      case 'carrier':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <Navigation2 className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium">Carrier {i}</h4>
                  <p className="text-sm text-gray-500">2.5 km away</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                {t('delivery.carrier.nearbyLocations')}
              </p>
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'customs':
        return t('delivery.customs.title');
      case 'document':
        return t('delivery.document.title');
      case 'quote':
        return t('delivery.quote.title');
      case 'carrier':
        return t('delivery.carrier.title');
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'customs':
        return Globe;
      case 'document':
        return FileText;
      case 'quote':
        return FileCheck;
      case 'carrier':
        return Navigation2;
    }
  };

  const Icon = getIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Icon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">{getTitle()}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {renderContent()}

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('common.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}