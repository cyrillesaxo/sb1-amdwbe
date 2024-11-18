import React from 'react';
import { User } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import type { User as UserType } from '../../types';

interface ProfileHeaderProps {
  user: UserType;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { t } = useI18nStore();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
      <div className="flex items-center space-x-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name}
            className="h-20 w-20 rounded-full border-4 border-white"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
            <User className="h-12 w-12 text-blue-500" />
          </div>
        )}
        <div className="text-white">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-blue-100">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-700 rounded-full text-sm">
            {user.role === 'bidder' ? t('user.role.bidder') : t('user.role.sender')}
          </span>
        </div>
      </div>
    </div>
  );
}