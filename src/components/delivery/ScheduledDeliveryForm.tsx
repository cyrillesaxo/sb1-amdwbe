import React, { useState } from 'react';
import { Package, Container, Box } from 'lucide-react';

type FreightType = 'parcel' | 'container' | 'freight';

interface ScheduledDeliveryFormProps {
  onSubmit: (data: any) => void;
}

export function ScheduledDeliveryForm({ onSubmit }: ScheduledDeliveryFormProps) {
  const [activeTab, setActiveTab] = useState<FreightType>('parcel');

  const tabs = [
    {
      id: 'parcel',
      name: 'Standard Parcel',
      icon: Package,
      description: 'For small to medium packages'
    },
    {
      id: 'container',
      name: 'Full Container',
      icon: Container,
      description: '20ft and 40ft containers'
    },
    {
      id: 'freight',
      name: 'Item-Based Freight',
      icon: Box,
      description: 'For bulk items and cargo'
    }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'parcel' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Weight (kg)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Dimensions</label>
              <div className="grid grid-cols-3 gap-4 mt-1">
                <input
                  type="number"
                  placeholder="Length"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Width"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Height"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'container' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Container Size</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="20ft">20ft Standard</option>
                <option value="40ft">40ft Standard</option>
                <option value="40ft-hc">40ft High Cube</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Containers</label>
              <input
                type="number"
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo Type</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'freight' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Commodity Type</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Weight (kg)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pieces/Units</label>
              <input
                type="number"
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Common Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
            <input
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}