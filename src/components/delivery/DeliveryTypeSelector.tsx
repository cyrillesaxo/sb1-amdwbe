import React from 'react';
import { Truck, Zap, Clock } from 'lucide-react';

export const DELIVERY_TYPES = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    icon: Truck,
    description: 'Regular delivery service with standard pricing. Best for non-urgent deliveries.',
    eta: '24-48 hours',
    price: 'From 5,000 FCFA'
  },
  {
    id: 'express',
    name: 'Express Delivery',
    icon: Zap,
    description: 'Priority delivery service with faster transit times. Perfect for urgent deliveries.',
    eta: '2-4 hours',
    price: 'From 7,500 FCFA'
  },
  {
    id: 'scheduled',
    name: 'Scheduled Delivery',
    icon: Clock,
    description: 'Plan your delivery for a specific date and time',
    eta: 'Choose your time',
    price: 'From 6,000 FCFA'
  }
] as const;

interface DeliveryTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export function DeliveryTypeSelector({ selectedType, onSelect }: DeliveryTypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {DELIVERY_TYPES.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`flex flex-col items-center p-6 rounded-xl transition-all ${
              isSelected
                ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-500'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-8 w-8 mb-3 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className="text-base font-medium">{type.name}</span>
            <p className="text-sm text-gray-500 mt-2 text-center">{type.description}</p>
            <div className="mt-3 text-center">
              <span className="block text-sm font-medium">{type.eta}</span>
              <span className="block text-sm text-gray-500 mt-1">{type.price}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}