import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface PackageImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

export function PackageImageUpload({ onImageUpload }: PackageImageUploadProps) {
  const { t } = useI18nStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError(t('delivery.errors.fileTooLarge'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError(t('delivery.errors.invalidFileType'));
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageUpload(file);

    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError(null);
    onImageUpload(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {t('delivery.packagePicture')}
        </label>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Package preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">{t('delivery.clickToUpload')}</span>
            </p>
            <p className="text-xs text-gray-500">
              {t('delivery.pictureRequirements')}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
}