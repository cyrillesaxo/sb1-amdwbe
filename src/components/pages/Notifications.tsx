import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';
import { notificationService, Notification } from '../../services/NotificationService';

export default function Notifications() {
  const navigate = useNavigate();
  const { t } = useI18nStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const notifications = await notificationService.getNotifications();
    setNotifications(notifications);
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedNotifications.size === notifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(new Set(notifications.map(n => n.id)));
    }
  };

  const handleMarkSelectedAsRead = async () => {
    for (const id of selectedNotifications) {
      await notificationService.markAsRead(id);
    }
    setSelectedNotifications(new Set());
    loadNotifications();
  };

  const handleDeleteSelected = async () => {
    // Implementation would depend on your backend API
    setSelectedNotifications(new Set());
    loadNotifications();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">{t('notifications.title')}</h1>
        </div>
        {selectedNotifications.size > 0 && (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleMarkSelectedAsRead}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Check className="h-5 w-5 mr-1" />
              <span>{t('notifications.markAsRead')}</span>
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5 mr-1" />
              <span>{t('notifications.delete')}</span>
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">{t('notifications.empty')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <button
              onClick={handleSelectAll}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {selectedNotifications.size === notifications.length
                ? t('notifications.unselectAll')
                : t('notifications.selectAll')}
            </button>
            <span className="text-sm text-gray-500">
              {notifications.length} {t('notifications.total')}
            </span>
          </div>

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                !notification.read ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200'
              } ${
                selectedNotifications.has(notification.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSelectNotification(notification.id)}
            >
              <div className="flex items-start">
                <Bell className="h-5 w-5 text-blue-600 mt-1" />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                    {notification.actionUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(notification.actionUrl!);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {t('notifications.viewDetails')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}