import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';
import { notificationService, Notification } from '../../services/NotificationService';
import { NotificationList } from './NotificationList';

export default function NotificationHistory() {
  const navigate = useNavigate();
  const { t } = useI18nStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();

    const handleNewNotification = () => {
      loadNotifications();
    };

    window.addEventListener('newNotification', handleNewNotification);

    return () => {
      window.removeEventListener('newNotification', handleNewNotification);
    };
  }, []);

  const loadNotifications = async () => {
    const notifications = await notificationService.getNotifications();
    setNotifications(notifications);
  };

  const handleMarkAsRead = async (ids: string[]) => {
    await Promise.all(ids.map(id => notificationService.markAsRead(id)));
    loadNotifications();
  };

  const handleDelete = async (ids: string[]) => {
    await Promise.all(ids.map(id => notificationService.deleteNotification(id)));
    loadNotifications();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">{t('notifications.history')}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <NotificationList
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}