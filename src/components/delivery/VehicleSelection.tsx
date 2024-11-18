import React from 'react';
import { Car, Truck, Bike, Container, PackageOpen, Forklift, Train as TrainIcon, Container as TankerIcon } from 'lucide-react';

interface VehicleSelectionProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export function VehicleSelection({ selectedType, onSelect }: VehicleSelectionProps) {
  const vehicles = [
    {
      id: 'car',
      name: 'Car',
      icon: Car,
      maxWeight: '100kg',
      basePrice: '5,000 FCFA',
      color: 'bg-blue-600'
    },
    {
      id: 'van',
      name: 'Van',
      icon: Truck,
      maxWeight: '500kg',
      basePrice: '10,000 FCFA',
      color: 'bg-green-600'
    },
    {
      id: 'truck',
      name: 'Truck',
      icon: Truck,
      maxWeight: '2000kg',
      basePrice: '20,000 FCFA',
      color: 'bg-purple-600'
    },
    {
      id: 'bike',
      name: 'Motorcycle',
      icon: Bike,
      maxWeight: '30kg',
      basePrice: '3,000 FCFA',
      color: 'bg-red-600'
    },
    {
      id: 'covered',
      name: 'Covered',
      icon: Container,
      maxWeight: '1500kg',
      basePrice: '15,000 FCFA',
      color: 'bg-yellow-600'
    },
    {
      id: 'open',
      name: 'Open',
      icon: PackageOpen,
      maxWeight: '1500kg',
      basePrice: '15,000 FCFA',
      color: 'bg-orange-600'
    },
    {
      id: 'flatbed',
      name: 'Flatbed',
      icon: Forklift,
      maxWeight: '2500kg',
      basePrice: '25,000 FCFA',
      color: 'bg-indigo-600'
    },
    {
      id: '2x-flatbed',
      name: '2X Flatbed',
      icon: Forklift,
      maxWeight: '5000kg',
      basePrice: '40,000 FCFA',
      color: 'bg-pink-600'
    },
    {
      id: 'tipper',
      name: 'Tipper',
      icon: Truck,
      maxWeight: '3000kg',
      basePrice: '30,000 FCFA',
      color: 'bg-teal-600'
    },
    {
      id: 'box',
      name: 'Box',
      icon: Container,
      maxWeight: '2000kg',
      basePrice: '20,000 FCFA',
      color: 'bg-cyan-600'
    },
    {
      id: 'train',
      name: 'Train',
      icon: TrainIcon,
      maxWeight: '10000kg',
      basePrice: '100,000 FCFA',
      color: 'bg-rose-600'
    },
    {
      id: 'tanker',
      name: 'Tanker',
      icon: TankerIcon,
      maxWeight: '5000kg',
      basePrice: '50,000 FCFA',
      color: 'bg-emerald-600'
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Vehicle Preference
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vehicles.map((vehicle) => {
          const Icon = vehicle.icon;
          const isSelected = selectedType === vehicle.id;
          return (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onSelect(vehicle.id)}
              className={`relative p-4 flex flex-col items-center border rounded-xl transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 ${vehicle.color} rounded-xl text-white p-3 mb-3`}>
                <Icon className="h-full w-full" />
              </div>
              <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
              <div className="mt-2 text-xs text-gray-500">
                <p>Max: {vehicle.maxWeight}</p>
                <p>From {vehicle.basePrice}</p>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}