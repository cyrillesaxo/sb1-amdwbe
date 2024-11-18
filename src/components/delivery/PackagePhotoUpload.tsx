import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface PackagePhotoUploadProps {
  onPhotoCapture: (photo: File) => void;
  type: 'pickup' | 'dropoff';
}

export function PackagePhotoUpload({ onPhotoCapture, type }: PackagePhotoUploadProps) {
  const { t } = useI18nStore();
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        onPhotoCapture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Implementation for camera capture
      setShowCamera(true);
    } catch (error) {
      console.error('Failed to access camera:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {type === 'pickup' ? t('delivery.pickupPhoto') : t('delivery.dropoffPhoto')}
      </h3>

      {photo ? (
        <div className="relative">
          <img
            src={photo}
            alt="Package"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => setPhoto(null)}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleCameraCapture}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
          >
            <Camera className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{t('delivery.takePhoto')}</span>
          </button>

          <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{t('delivery.uploadPhoto')}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {showCamera && (
        <div className="fixed inset-0 bg-black z-50">
          {/* Camera UI implementation */}
        </div>
      )}
    </div>
  );
}