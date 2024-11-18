import React, { useState } from 'react';
import { Image as ImageIcon, X, Globe, FileText, FileCheck, Navigation2 } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import { MoreInfoPopup } from './MoreInfoPopup';

interface StandardParcelFormProps {
  values: {
    weight: string;
    description?: string;
    photo?: File | null;
    scheduledDate?: string;
    scheduledTime?: string;
  };
  onChange: (values: any) => void;
  showSchedule?: boolean;
}

export function StandardParcelForm({ values, onChange, showSchedule = false }: StandardParcelFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useI18nStore();
  const [activePopup, setActivePopup] = useState<'customs' | 'document' | 'quote' | 'carrier' | null>(null);

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
      {/* Package Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('delivery.packageDetails.title')}</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">{t('delivery.weight')}</label>
            <input
              type="number"
              value={values.weight}
              onChange={(e) => onChange({ ...values, weight: e.target.value })}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg h-14 px-4 bg-white hover:border-blue-400 transition-colors"
              required
              placeholder={t('delivery.weightPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">{t('delivery.description')}</label>
            <textarea
              value={values.description}
              onChange={(e) => onChange({ ...values, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg p-4 bg-white hover:border-blue-400 transition-colors"
              required
              placeholder={t('delivery.descriptionPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Package Picture */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <label className="block text-lg font-medium text-gray-800 mb-4">{t('delivery.packagePicture')}</label>
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={t('delivery.packagePreview')}
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="border-3 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="parcel-photo"
            />
            <label htmlFor="parcel-photo" className="cursor-pointer">
              <div className="text-center">
                <ImageIcon className="mx-auto h-16 w-16 text-gray-400" />
                <div className="mt-4">
                  <span className="text-lg font-medium text-gray-900">{t('delivery.clickToUpload')}</span>
                </div>
                <p className="mt-2 text-base text-gray-500">{t('delivery.uploadRequirements')}</p>
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
                onClick={() => setActivePopup(action.id as any)}
                className={`p-4 rounded-xl ${action.color} flex flex-col items-center justify-center hover:shadow-md transition-all`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Details */}
      {showSchedule && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('delivery.scheduleDetails')}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">{t('delivery.deliveryDate')}</label>
              <input
                type="date"
                value={values.scheduledDate}
                onChange={(e) => onChange({ ...values, scheduledDate: e.target.value })}
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg h-14 px-4 bg-white hover:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">{t('delivery.deliveryTime')}</label>
              <input
                type="time"
                value={values.scheduledTime}
                onChange={(e) => onChange({ ...values, scheduledTime: e.target.value })}
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg h-14 px-4 bg-white hover:border-blue-400 transition-colors"
                required
              />
            </div>
          </div>
        </div>
      )}

      {activePopup && (
        <MoreInfoPopup
          type={activePopup}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}