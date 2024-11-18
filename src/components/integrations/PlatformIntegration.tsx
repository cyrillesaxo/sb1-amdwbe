import React from 'react';
import { ShoppingBag, ShoppingCart, Grid } from 'lucide-react';
import { SUPPORTED_PLATFORMS } from '../../config/integrations';
import { useI18nStore } from '../../store/i18nStore';

export function PlatformIntegration() {
  const { t } = useI18nStore();
  const handleConnect = (platformId: string) => {
    // Integration logic here
    console.log(`Connecting to ${platformId}`);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          E-commerce Platforms
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your online store to manage deliveries
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SUPPORTED_PLATFORMS.map((platform) => (
          <div
            key={platform.id}
            className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {platform.icon === 'shopping-bag' && <ShoppingBag className="h-6 w-6 text-blue-500" />}
                {platform.icon === 'shopping-cart' && <ShoppingCart className="h-6 w-6 text-green-500" />}
                {platform.icon === 'grid' && <Grid className="h-6 w-6 text-purple-500" />}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{platform.name}</h4>
                  {platform.id === 'shopify' && <span className="text-sm text-gray-500">US</span>}
                  {platform.id === 'woocommerce' && <span className="text-sm text-gray-500">GB</span>}
                  {platform.id === 'wix' && <span className="text-sm text-gray-500">AU</span>}
                </div>
              </div>
              <button
                onClick={() => handleConnect(platform.id)}
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