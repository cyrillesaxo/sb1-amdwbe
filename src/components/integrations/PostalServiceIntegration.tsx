import React from 'react';
import { Truck } from 'lucide-react';
import { POSTAL_SERVICES } from '../../config/integrations';
import { useI18nStore } from '../../store/i18nStore';

export function PostalServiceIntegration() {
  const { t } = useI18nStore();
  const handleConnect = (serviceId: string) => {
    // Integration logic here
    console.log(`Connecting to ${serviceId}`);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Postal Services
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect with postal services for shipping and tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {POSTAL_SERVICES.map((service) => (
          <div
            key={service.id}
            className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-blue-500" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{service.name}</h4>
                  <span className="text-sm text-gray-500">{service.country}</span>
                </div>
              </div>
              <button
                onClick={() => handleConnect(service.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}