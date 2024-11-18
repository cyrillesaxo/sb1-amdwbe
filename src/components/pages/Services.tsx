import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Car, Users, ShoppingBag, ShoppingCart, Wine,
  Package, Store, Pill, Droplet, Baby, Coffee,
  Dog, Flower2, Building, Laptop, Truck
} from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

export default function Services() {
  const navigate = useNavigate();
  const { t } = useI18nStore();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service-details`, { state: { serviceType: serviceId } });
  };

  const rideServices = [
    {
      id: 'hourly',
      name: t('services.transportation.hourly.name'),
      icon: Clock,
      description: t('services.transportation.hourly.description'),
      color: 'bg-blue-600'
    },
    {
      id: 'reserve',
      name: t('services.transportation.reserve.name'),
      icon: Car,
      description: t('services.transportation.reserve.description'),
      color: 'bg-green-600'
    },
    {
      id: 'group',
      name: t('services.transportation.group.name'),
      icon: Users,
      description: t('services.transportation.group.description'),
      color: 'bg-purple-600'
    }
  ];

  const deliveryServices = [
    {
      id: 'food',
      name: t('services.delivery.food.name'),
      icon: ShoppingBag,
      description: t('services.delivery.food.description'),
      color: 'bg-red-500'
    },
    {
      id: 'grocery',
      name: t('services.delivery.grocery.name'),
      icon: ShoppingCart,
      description: t('services.delivery.grocery.description'),
      color: 'bg-green-500'
    },
    {
      id: 'alcohol',
      name: t('services.delivery.alcohol.name'),
      icon: Wine,
      description: t('services.delivery.alcohol.description'),
      color: 'bg-purple-500'
    },
    {
      id: 'convenience',
      name: t('services.delivery.convenience.name'),
      icon: Package,
      description: t('services.delivery.convenience.description'),
      color: 'bg-blue-500'
    },
    {
      id: 'health',
      name: t('services.delivery.health.name'),
      icon: Pill,
      description: t('services.delivery.health.description'),
      color: 'bg-pink-500'
    },
    {
      id: 'personalCare',
      name: t('services.delivery.personalCare.name'),
      icon: Droplet,
      description: t('services.delivery.personalCare.description'),
      color: 'bg-indigo-500'
    },
    {
      id: 'baby',
      name: t('services.delivery.baby.name'),
      icon: Baby,
      description: t('services.delivery.baby.description'),
      color: 'bg-yellow-500'
    },
    {
      id: 'gourmet',
      name: t('services.delivery.gourmet.name'),
      icon: Coffee,
      description: t('services.delivery.gourmet.description'),
      color: 'bg-amber-500'
    },
    {
      id: 'petSupplies',
      name: t('services.delivery.petSupplies.name'),
      icon: Dog,
      description: t('services.delivery.petSupplies.description'),
      color: 'bg-orange-500'
    },
    {
      id: 'flowers',
      name: t('services.delivery.flowers.name'),
      icon: Flower2,
      description: t('services.delivery.flowers.description'),
      color: 'bg-rose-500'
    },
    {
      id: 'retail',
      name: t('services.delivery.retail.name'),
      icon: Building,
      description: t('services.delivery.retail.description'),
      color: 'bg-cyan-500'
    },
    {
      id: 'electronics',
      name: t('services.delivery.electronics.name'),
      icon: Laptop,
      description: t('services.delivery.electronics.description'),
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">{t('services.title')}</h1>
          <p className="text-blue-100">{t('services.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Ride Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('services.transportation.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rideServices.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-xl text-white p-3 mb-4`}>
                    <Icon className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('services.delivery.title')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {deliveryServices.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-xl text-white p-3 mb-4`}>
                    <Icon className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Package & Store Pickup */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('services.additional.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleServiceClick('package')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-500 rounded-xl text-white p-3">
                  <Package className="h-full w-full" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('services.additional.package.name')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('services.additional.package.description')}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleServiceClick('store-pickup')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-purple-500 rounded-xl text-white p-3">
                  <Store className="h-full w-full" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('services.additional.storePickup.name')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('services.additional.storePickup.description')}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">
            {t('services.trust.title')}
          </h2>
          <p className="text-center text-gray-400 mb-8">
            {t('services.trust.subtitle')}
          </p>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
              <div className="text-3xl font-bold text-green-400">99.9%</div>
              <div className="text-sm text-gray-400">{t('services.trust.stats.success')}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
              <div className="text-3xl font-bold text-green-400">15K+</div>
              <div className="text-sm text-gray-400">{t('services.trust.stats.users')}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
              <div className="text-3xl font-bold text-green-400">4.9/5</div>
              <div className="text-sm text-gray-400">{t('services.trust.stats.rating')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}