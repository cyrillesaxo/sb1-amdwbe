import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Clock, Truck } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import { useDeliveryStore } from '../../store/useStore';
import { VehicleSelection } from './VehicleSelection';
import { DeliveryMap } from './DeliveryMap';
import { PackageImageUpload } from './PackageImageUpload';
import { StandardParcelForm } from './StandardParcelForm';
import { FullContainerForm } from './FullContainerForm';
import { ItemBasedFreightForm } from './ItemBasedFreightForm';

type DeliveryType = 'standard' | 'express' | 'scheduled';
type FreightType = 'parcel' | 'container' | 'freight';

interface DeliveryFormData {
  pickup: string;
  dropoff: string;
  weight: string;
  description: string;
  photo: File | null;
  vehicleType: string;
  scheduledDate?: string;
  scheduledTime?: string;
  containerSize?: string;
  numberOfContainers?: number;
  weightPerContainer?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  pieces?: number;
}

export default function DeliveryRequestForm() {
  const { t } = useI18nStore();
  const navigate = useNavigate();
  const { addDeliveryRequest, loading } = useDeliveryStore();
  const [showMap, setShowMap] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('standard');
  const [freightType, setFreightType] = useState<FreightType>('parcel');
  
  const [formData, setFormData] = useState<DeliveryFormData>({
    pickup: '',
    dropoff: '',
    weight: '',
    description: '',
    photo: null,
    vehicleType: 'car',
    scheduledDate: '',
    scheduledTime: '',
    containerSize: '',
    numberOfContainers: 1,
    weightPerContainer: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    pieces: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDeliveryRequest({
        pickup: { address: formData.pickup, lat: 4.0511, lng: 9.7679 },
        dropoff: { address: formData.dropoff, lat: 4.0611, lng: 9.7779 },
        package: {
          weight: Number(formData.weight),
          dimensions: formData.dimensions || { length: 0, width: 0, height: 0 },
          description: formData.description,
          image: formData.photo
        },
        vehicleType: formData.vehicleType,
        status: 'pending',
        userId: '1',
        type: deliveryType,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime
      });
      setShowMap(true);
    } catch (error) {
      console.error('Error creating delivery request:', error);
    }
  };

  if (showMap) {
    return (
      <DeliveryMap
        pickup={{ lat: 4.0511, lng: 9.7679 }}
        dropoff={{ lat: 4.0611, lng: 9.7779 }}
        onClose={() => navigate('/activity')}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('delivery.title')}</h1>
        <p className="text-blue-100">{t('delivery.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Type Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.selecttype')}</h2>
          <div className="grid grid-cols-3 gap-4">
            {['standard', 'express', 'scheduled'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDeliveryType(type as DeliveryType)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  deliveryType === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex flex-col items-center">
                  {type === 'standard' && <Truck className="h-6 w-6 text-blue-500 mb-2" />}
                  {type === 'express' && <Package className="h-6 w-6 text-green-500 mb-2" />}
                  {type === 'scheduled' && <Clock className="h-6 w-6 text-purple-500 mb-2" />}
                  <span className="font-medium capitalize">{t(`delivery.types.${type}.title`)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>


        {/* Freight Type Selection for Scheduled Delivery */}
        {deliveryType === 'scheduled' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Freight Type</h2>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setFreightType('parcel')}
                className={`w-full flex items-center p-4 rounded-lg border ${
                  freightType === 'parcel' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Package className="h-6 w-6 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Standard Parcel</div>
                  <div className="text-sm text-gray-500">For small to medium packages</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFreightType('container')}
                className={`w-full flex items-center p-4 rounded-lg border ${
                  freightType === 'container' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Truck className="h-6 w-6 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Full Container</div>
                  <div className="text-sm text-gray-500">20ft and 40ft containers</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFreightType('freight')}
                className={`w-full flex items-center p-4 rounded-lg border ${
                  freightType === 'freight' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Package className="h-6 w-6 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Item-Based Freight</div>
                  <div className="text-sm text-gray-500">For bulk items and cargo</div>
                </div>
              </button>
            </div>
          </div>
        )}

        
        {/* Location Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.locationDetails')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.pickupLocation')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => setFormData(prev => ({ ...prev, pickup: e.target.value }))}
                  placeholder={t('delivery.enterPickupAddress')}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('delivery.dropoffLocation')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.dropoff}
                  onChange={(e) => setFormData(prev => ({ ...prev, dropoff: e.target.value }))}
                  placeholder={t('delivery.enterDropoffAddress')}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t('delivery.packageDetails.title')}</h2>
          {deliveryType === 'scheduled' ? (
            <>
              {freightType === 'parcel' && (
                <StandardParcelForm
                  values={formData}
                  onChange={(values) => setFormData(prev => ({ ...prev, ...values }))}
                />
              )}
              {freightType === 'container' && (
                <FullContainerForm
                  values={formData}
                  onChange={(values) => setFormData(prev => ({ ...prev, ...values }))}
                />
              )}
              {freightType === 'freight' && (
                <ItemBasedFreightForm
                  values={formData}
                  onChange={(values) => setFormData(prev => ({ ...prev, ...values }))}
                />
              )}
            </>
          ) : (
            <StandardParcelForm
              values={formData}
              onChange={(values) => setFormData(prev => ({ ...prev, ...values }))}
            />
          )}
        </div>

        {/* Vehicle Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <VehicleSelection
            selectedType={formData.vehicleType}
            onSelect={(type) => setFormData(prev => ({ ...prev, vehicleType: type }))}
          />
        </div>

        {/* Package Image Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <PackageImageUpload
            onImageUpload={(file) => setFormData(prev => ({ ...prev, photo: file }))}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-lg font-medium"
        >
          {loading ? t('common.loading') : t('delivery.createRequest')}
        </button>
      </form>
    </div>
  );
}