import { useState, useEffect } from 'react';
import { notificationService, Notification } from '../services/NotificationService';
import { webSocketService } from '../services/WebSocketService';

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize WebSocket connection
    webSocketService.connect(userId);

    // Load initial notifications
    loadNotifications();

    // Listen for new notifications
    const handleNewNotification = () => {
      loadNotifications();
    };

    window.addEventListener('newNotification', handleNewNotification);

    return () => {
      window.removeEventListener('newNotification', handleNewNotification);
      webSocketService.disconnect();
    };
  }, [userId]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const notifications = await notificationService.getNotifications();
      setNotifications(notifications);
      setUnreadCount(notifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    loadNotifications();
  };

  const markAllAsRead = async () => {
    await notificationService.markAllAsRead();
    loadNotifications();
  };

  const deleteNotification = async (id: string) => {
    await notificationService.deleteNotification(id);
    loadNotifications();
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: loadNotifications
  };
}