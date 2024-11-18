import React from 'react';
import { X, Bell, Package, CreditCard, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationList } from './NotificationList';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { t } = useI18nStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications(user?.id || '');

  if (!isOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'delivery':
        return Package;
      case 'payment':
        return CreditCard;
      case 'emergency':
        return AlertTriangle;
      case 'system':
        return Info;
      default:
        return Bell;
    }
  };

  const handleViewAll = () => {
    onClose();
    navigate('/notifications');
  };

  const handleMarkAsRead = async (ids: string[]) => {
    await Promise.all(ids.map(id => markAsRead(id)));
  };

  const handleDelete = async (ids: string[]) => {
    await Promise.all(ids.map(id => deleteNotification(id)));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('notifications.title')}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {t('notifications.markAllRead')}
            </button>
            <button
              onClick={handleViewAll}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              {t('notifications.viewAll')}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-32">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}