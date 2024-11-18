import React, { useState } from 'react';
import { Image as ImageIcon, X, Globe, FileText, FileCheck, Navigation2 } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface FullContainerFormProps {
  values: {
    containerSize?: string;
    numberOfContainers?: number;
    weightPerContainer?: number;
    description?: string;
    photo?: File | null;
    scheduledDate?: string;
    scheduledTime?: string;
  };
  onChange: (values: any) => void;
}

export function FullContainerForm({ values, onChange }: FullContainerFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useI18nStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t('delivery.fileSizeAlert'));
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange({ ...values, photo: file });
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange({ ...values, photo: null });
  };

  return (
    <div className="space-y-6">
      {/* Schedule Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.scheduleDetails')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.deliveryDate')}</label>
            <input
              type="date"
              value={values.scheduledDate}
              onChange={(e) => onChange({ ...values, scheduledDate: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.deliveryTime')}</label>
            <input
              type="time"
              value={values.scheduledTime}
              onChange={(e) => onChange({ ...values, scheduledTime: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Freight Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.freightDetails')}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.containerSize')}</label>
            <select
              value={values.containerSize}
              onChange={(e) => onChange({ ...values, containerSize: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">{t('delivery.selectSize')}</option>
              <option value="20dv">{t('delivery.container20dv')}</option>
              <option value="40dv">{t('delivery.container40dv')}</option>
              <option value="40hc">{t('delivery.container40hc')}</option>
              <option value="45hc">{t('delivery.container45hc')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.numberOfContainers')}</label>
            <input
              type="number"
              min="1"
              value={values.numberOfContainers}
              onChange={(e) => onChange({ ...values, numberOfContainers: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.weightPerContainer')}</label>
            <input
              type="number"
              value={values.weightPerContainer}
              onChange={(e) => onChange({ ...values, weightPerContainer: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('delivery.description')}</label>
            <textarea
              value={values.description}
              onChange={(e) => onChange({ ...values, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Package Picture */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-4">{t('delivery.packagePicture')}</label>
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={t('delivery.packagePreview')}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="container-photo"
            />
            <label htmlFor="container-photo" className="cursor-pointer">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-900">{t('delivery.clickToUpload')}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{t('delivery.uploadRequirements')}</p>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* More Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.moreInformation')}</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              id: 'customs',
              name: t('navigation.customs'),
              icon: Globe,
              color: 'bg-purple-50 text-purple-600'
            },
            {
              id: 'document',
              name: t('navigation.document'),
              icon: FileText,
              color: 'bg-blue-50 text-blue-600'
            },
            {
              id: 'quote',
              name: t('navigation.quote'),
              icon: FileCheck,
              color: 'bg-green-50 text-green-600'
            },
            {
              id: 'carrier',
              name: t('navigation.carrier'),
              icon: Navigation2,
              color: 'bg-red-50 text-red-600'
            }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className={`p-4 rounded-xl ${action.color} flex flex-col items-center justify-center hover:shadow-md transition-all`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}