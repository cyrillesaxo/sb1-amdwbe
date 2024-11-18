import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';
import {
  Package,
  Clock,
  MapPin,
  Shield,
  Star,
  Truck,
  Zap,
  Calendar,
  Info,
  CheckCircle,
  Search,
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const { t } = useI18nStore();

  const features = [
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description:
        'Track your deliveries in real-time with our advanced GPS system',
      tooltip:
        'Get live updates, estimated arrival times, and instant notifications',
      color: 'bg-blue-500',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple secure payment options including mobile money',
      tooltip: 'End-to-end encrypted transactions with fraud protection',
      color: 'bg-green-500',
    },
    {
      icon: Star,
      title: 'Verified Partners',
      description: 'All our delivery partners are verified and rated',
      tooltip: 'Background-checked and trained delivery professionals',
      color: 'bg-purple-500',
    },
  ];

  const deliveryTypes = [
    {
      id: 'standard',
      name: 'Standard',
      icon: Truck,
      description: 'Regular delivery service',
      eta: '24-48 hours',
      price: '5,000 FCFA',
      features: [
        'Real-time tracking',
        'Insurance up to 100,000 FCFA',
        'Multiple vehicle options',
      ],
      color: 'bg-blue-600',
    },
    {
      id: 'express',
      name: 'Express',
      icon: Zap,
      description: 'Same-day delivery',
      eta: '2-4 hours',
      price: '7,500 FCFA',
      features: ['Priority handling', 'Dedicated driver', 'Live chat support'],
      color: 'bg-green-600',
    },
    {
      id: 'scheduled',
      name: 'Scheduled',
      icon: Calendar,
      description: 'Choose your delivery time',
      eta: 'You decide',
      price: 'From 6,000 FCFA',
      features: [
        'Flexible scheduling',
        'All package types',
        'Container shipping',
      ],
      color: 'bg-purple-600',
    },
  ];

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      navigate(`/activity?tracking=${trackingNumber}`);
    }
  };

  const handleDeliveryClick = (typeId: string) => {
    navigate('/delivery/new', {
      state: {
        deliveryType: typeId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Tracking */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.hero.subtitle')}
          </p>

          {/* Tracking Form */}
          <div className="max-w-xl mx-auto mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Track Your Package</h2>
            <form onSubmit={handleTrackingSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Package className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors flex items-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Track
              </button>
            </form>
          </div>

          <button
            onClick={() => navigate('/delivery/new')}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all transform hover:-translate-y-1"
          >
            {t('home.hero.cta')}
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto mt-10 px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="relative group">
                <div
                  className={`${feature.color} p-6 rounded-xl shadow-lg text-white h-full`}
                >
                  <Icon className="h-8 w-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100">{feature.description}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <Info className="h-5 w-5 text-white cursor-help" />
                      <div className="absolute right-0 w-48 p-2 bg-white text-gray-800 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity mt-1 z-10">
                        {feature.tooltip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Types */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Choose your delivery type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveryTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleDeliveryClick(type.id)}
                className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${type.color} rounded-xl text-white p-3 mb-4`}
                >
                  <Icon className="h-full w-full" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {type.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {type.eta}
                    </div>
                    <span className="font-medium text-gray-900">
                      {type.price}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-green-400 mr-2" />
            <h2 className="text-2xl font-bold">Trusted by Thousands</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Join our community of satisfied customers who trust us with their
            deliveries
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-green-400">99.9%</div>
              <div className="text-sm text-gray-400">Delivery Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">15K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">4.9/5</div>
              <div className="text-sm text-gray-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
