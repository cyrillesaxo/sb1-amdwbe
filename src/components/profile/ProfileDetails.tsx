import React from 'react';
import { MapPin, Building, Phone, Star, Package, Wallet, Bell } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import type { User } from '../../types';

interface ProfileDetailsProps {
  user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const { t } = useI18nStore();

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Phone className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{user.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{user.contact?.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Alternate Email</p>
            <p className="font-medium text-gray-900">{user.contact?.alternateEmail}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Address Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Street</p>
            <p className="font-medium text-gray-900">{user.address?.street}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium text-gray-900">{user.address?.city}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">State</p>
            <p className="font-medium text-gray-900">{user.address?.state}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium text-gray-900">{user.address?.country}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">ZIP Code</p>
            <p className="font-medium text-gray-900">{user.address?.zip}</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <Package className="h-5 w-5 text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Total Deliveries</p>
          <p className="text-xl font-semibold text-gray-900">{user.stats?.totalDeliveries}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <Wallet className="h-5 w-5 text-green-500 mb-2" />
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-xl font-semibold text-gray-900">{user.stats?.totalSpent}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <Star className="h-5 w-5 text-yellow-500 mb-2" />
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-xl font-semibold text-gray-900">{user.stats?.averageRating}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <Star className="h-5 w-5 text-purple-500 mb-2" />
          <p className="text-sm text-gray-500">Loyalty Points</p>
          <p className="text-xl font-semibold text-gray-900">{user.stats?.loyaltyPoints}</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-indigo-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Language</p>
            <p className="font-medium text-gray-900">{user.preferences?.language}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Currency</p>
            <p className="font-medium text-gray-900">{user.preferences?.currency}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Theme</p>
            <p className="font-medium text-gray-900">{user.preferences?.theme}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Notifications</p>
            <div className="flex gap-2">
              {user.preferences?.notifications.email && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Email
                </span>
              )}
              {user.preferences?.notifications.sms && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  SMS
                </span>
              )}
              {user.preferences?.notifications.push && (
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                  Push
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Saved Locations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Saved Locations</h3>
        </div>
        <div className="space-y-4">
          {user.savedLocations?.map((location) => (
            <div key={location.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{location.name}</p>
                <p className="text-sm text-gray-500">{location.address}</p>
                <p className="text-xs text-gray-400">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}