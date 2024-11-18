import React from 'react';
import type { Package } from '../../types';
import { useI18nStore } from '../../store/i18nStore';

interface PackageDetailsInputProps {
  value: Package;
  onChange: (pkg: Package) => void;
}

export function PackageDetailsInput({ value, onChange }: PackageDetailsInputProps) {
   const { t } = useI18nStore();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('delivery.packageDetails.weight')}</label>
          <input
            type="number"
            value={value.weight}
            onChange={(e) => onChange({ ...value, weight: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('delivery.packageDetails.value')}</label>
          <input
            type="number"
            value={value.value}
            onChange={(e) => onChange({ ...value, value: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('delivery.packageDetails.specialHandling')}</label>
          <div className="mt-2">
            <input
              type="checkbox"
              checked={value.requiresSpecialHandling}
              onChange={(e) => onChange({ ...value, requiresSpecialHandling: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('delivery.packageDetails.required')}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t('delivery.packageDetails.description')}</label>
        <textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
