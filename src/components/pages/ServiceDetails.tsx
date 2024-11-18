import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface Partner {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  offers?: string[];
  tags?: string[];
  acceptsSnap?: boolean;
}

export default function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useI18nStore();
  const serviceType = location.state?.serviceType || 'food';

  const partners: Record<string, Partner[]> = {
    food: [
      {
        id: 'target',
        name: 'Target',
        logo: 'https://logo.clearbit.com/target.com',
        rating: 4.8,
        deliveryFee: 0.49,
        deliveryTime: '45 min',
        offers: [t('serviceDetails.store.offers.firstOrder')]
      },
      {
        id: 'walmart',
        name: 'Walmart',
        logo: 'https://logo.clearbit.com/walmart.com',
        rating: 4.7,
        deliveryFee: 0.99,
        deliveryTime: '35 min'
      }
    ],
    grocery: [
      {
        id: 'wholeFoods',
        name: 'Whole Foods',
        logo: 'https://logo.clearbit.com/wholefoods.com',
        rating: 4.8,
        deliveryFee: 0,
        deliveryTime: '30 min',
        tags: [t('serviceDetails.store.tags.organic'), t('serviceDetails.store.tags.fresh')]
      },
      {
        id: 'traderjoes',
        name: "Trader Joe's",
        logo: 'https://logo.clearbit.com/traderjoes.com',
        rating: 4.7,
        deliveryFee: 1.99,
        deliveryTime: '40 min',
        tags: [t('serviceDetails.store.tags.specialty'), t('serviceDetails.store.tags.organic')]
      }
    ]
  };

  const currentPartners = partners[serviceType] || [];
  const filteredPartners = currentPartners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={t('serviceDetails.search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            {t('serviceDetails.search.filters')}
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            {t('serviceDetails.search.deliveryTime')}
            <ChevronDown className="h-4 w-4 ml-1 inline" />
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            {t('serviceDetails.search.rating')}
            <ChevronDown className="h-4 w-4 ml-1 inline" />
          </button>
        </div>
      </div>

      {/* Partners List */}
      <div className="space-y-4">
        {filteredPartners.map((partner) => (
          <button
            key={partner.id}
            onClick={() => navigate(`/store/${partner.id}`)}
            className="w-full flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-16 h-16 rounded-lg object-contain bg-gray-50"
            />
            <div className="flex-1 ml-4 text-left">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{partner.name}</h3>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1">{partner.rating}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                <span className="ml-1">{partner.deliveryTime}</span>
                <span className="mx-2">•</span>
                <DollarSign className="h-4 w-4" />
                <span className="ml-1">${partner.deliveryFee.toFixed(2)} {t('serviceDetails.store.deliveryFee')}</span>
              </div>
              {partner.offers && partner.offers.length > 0 && (
                <div className="mt-2">
                  {partner.offers.map((offer, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mr-2"
                    >
                      {offer}
                    </span>
                  ))}
                </div>
              )}
              {partner.tags && partner.tags.length > 0 && (
                <div className="mt-2">
                  {partner.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}

        {filteredPartners.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('serviceDetails.noResults.message')}</p>
          </div>
        )}
      </div>
    </div>
  );
}