import React from 'react';
import { MapPin, Package, Clock, Truck } from 'lucide-react';
import type { DeliveryRequest } from '../../types';

interface DeliveryCardProps {
  delivery: DeliveryRequest;
  onClick?: () => void;
}

export function DeliveryCard({ delivery, onClick }: DeliveryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Truck className="h-5 w-5 text-blue-600" />
          <span className="ml-2 text-sm font-medium text-gray-900">
            Delivery #{delivery.id.slice(0, 8)}
          </span>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            delivery.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : delivery.status === 'in_progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {delivery.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="ml-2">
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="text-sm font-medium text-gray-900">
              {delivery.pickup.address}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="ml-2">
            <p className="text-sm text-gray-600">Dropoff</p>
            <p className="text-sm font-medium text-gray-900">
              {delivery.dropoff.address}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Package className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="ml-2">
            <p className="text-sm text-gray-600">Package</p>
            <p className="text-sm font-medium text-gray-900">
              {delivery.package.description}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="ml-2">
            <p className="text-sm text-gray-600">Created</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(delivery.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {delivery.isExpressDelivery && (
        <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Express Delivery
        </div>
      )}
    </div>
  );
}