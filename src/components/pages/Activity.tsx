import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Star, FileText, Globe, Navigation2, FileCheck,
  AlertTriangle, Package, CheckCircle
} from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

export default function Activity() {
  const { t } = useI18nStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Active Delivery */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{t('activity.activeDelivery.title')}: SNWPLE-172952078</h2>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 text-blue-200 mr-2" />
                <span className="text-blue-100">{t('activity.activeDelivery.estimatedDelivery')}: Monday, 10/28/2024</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
                  {t('activity.activeDelivery.delayed')}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              {t('activity.activeDelivery.trackDelivery')}
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-6">
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900">{t('activity.status.scheduled')}</div>
                    <div className="text-sm text-gray-500">10/23/2024</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900">{t('activity.status.pickedUp')}</div>
                    <div className="text-sm text-gray-500">{t('activity.status.pending')}</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900">{t('activity.status.delivered')}</div>
                    <div className="text-sm text-gray-500">{t('activity.status.pending')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200">
              <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <p className="text-sm text-yellow-700">
                {t('activity.delayNotice')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
              <FileText className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">{t('activity.quickActions.documentUpload')}</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all">
              <FileCheck className="h-6 w-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">{t('activity.quickActions.quote')}</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all">
              <Globe className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">{t('activity.quickActions.customsInfo')}</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
              <Navigation2 className="h-6 w-6 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-900">{t('activity.quickActions.carrierLocations')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t('activity.shipmentDetails.shipper')}</h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <p className="font-medium text-gray-900">Machinery Parts Warehouse</p>
                <p className="text-gray-600">1600 nw 63rd st</p>
                <p className="text-gray-600">Ocala, FL 34475</p>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{t('activity.shipmentDetails.hours')}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>815-580-3247</span>
                </div>
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Ocala,FL+34475&zoom=13&size=400x200&markers=color:red%7COcala,FL+34475&key=AIzaSyC58kSIm3luVrerFb7KO5AzQC7jkzCjbBM" 
                  alt="Shipper location"
                  className="mt-4 w-full h-48 rounded-lg object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t('activity.shipmentDetails.consignee')}</h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <p className="font-medium text-gray-900">ONATECH GROUP LLC</p>
                <p className="text-gray-600">1000 MONTANA DR</p>
                <p className="text-gray-600">Charlotte, NC 28216</p>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{t('activity.shipmentDetails.hours')}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>3369185198</span>
                </div>
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Charlotte,NC+28216&zoom=13&size=400x200&markers=color:red%7CCharlotte,NC+28216&key=AIzaSyC58kSIm3luVrerFb7KO5AzQC7jkzCjbBM" 
                  alt="Consignee location"
                  className="mt-4 w-full h-48 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Deliveries */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Past Deliveries</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Douala Central Market → Bonapriso Mall</h3>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1">4.8</span>
              </div>
              <span className="mx-2">•</span>
              <Package className="h-4 w-4 text-gray-400 mr-1" />
              <span>5,000 FCFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">
          <span className="text-green-400">✓</span> Trusted by Thousands
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Join our community of satisfied customers who trust us with their deliveries
        </p>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-green-400">99.9%</div>
            <div className="text-sm text-gray-400">Delivery Success Rate</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-green-400">15K+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-green-400">4.9/5</div>
            <div className="text-sm text-gray-400">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}