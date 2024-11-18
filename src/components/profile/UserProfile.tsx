import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import ProfileHistory from './ProfileHistory';
import ProfilePayments from './ProfilePayments';
import ProfileSettings from './ProfileSettings';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');

  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return <ProfileDetails user={user} />;
      case 'history':
        return <ProfileHistory user={user} />;
      case 'payments':
        return <ProfilePayments user={user} />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <ProfileDetails user={user} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="flex items-center">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-white"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
              <User className="h-12 w-12 text-blue-600" />
            </div>
          )}
          <div className="ml-6">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="text-blue-100">Member since {user.stats?.memberSince}</span>
              </div>
              <span className="text-blue-200">·</span>
              <span className="px-2 py-1 bg-blue-500 rounded-full text-sm">
                {user.role === 'sender' ? 'Sender' : 'Delivery Partner'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="p-8 bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
}