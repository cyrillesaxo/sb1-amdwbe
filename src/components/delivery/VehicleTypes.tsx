import { Bike, Car, Truck } from 'lucide-react';

export const vehicleTypes = [
  {
    id: 'bike',
    name: 'delivery.vehicleTypes.bike',
    description: 'delivery.vehicleDescriptions.bike',
    icon: Bike,
    maxWeight: '10kg',
    basePrice: '2,000 FCFA',
    pricePerKm: 100
  },
  {
    id: 'car',
    name: 'delivery.vehicleTypes.car',
    description: 'delivery.vehicleDescriptions.car',
    icon: Car,
    maxWeight: '100kg',
    basePrice: '5,000 FCFA',
    pricePerKm: 200
  },
  {
    id: 'van',
    name: 'delivery.vehicleTypes.van',
    description: 'delivery.vehicleDescriptions.van',
    icon: Car,
    maxWeight: '500kg',
    basePrice: '10,000 FCFA',
    pricePerKm: 300
  },
  {
    id: 'truck',
    name: 'delivery.vehicleTypes.truck',
    description: 'delivery.vehicleDescriptions.truck',
    icon: Truck,
    maxWeight: '2000kg',
    basePrice: '20,000 FCFA',
    pricePerKm: 500
  }
];