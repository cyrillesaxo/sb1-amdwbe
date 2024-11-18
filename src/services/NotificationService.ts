import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Notification {
  id: string;
  type: 'delivery' | 'payment' | 'system' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

interface NotificationDB extends DBSchema {
  notifications: {
    key: string;
    value: Notification;
    indexes: { 'by-timestamp': string };
  };
}

class NotificationService {
  private db: IDBPDatabase<NotificationDB> | null = null;

  async init() {
    if (this.db) return;

    this.db = await openDB<NotificationDB>('gopack-notifications', 1, {
      upgrade(db) {
        const store = db.createObjectStore('notifications', {
          keyPath: 'id'
        });
        store.createIndex('by-timestamp', 'timestamp');
      }
    });

    // Request notification permission
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registered:', registration);
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    }
  }

  async addNotification(notification: Notification) {
    await this.init();
    await this.db!.add('notifications', {
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    });
  }

  async getNotifications(): Promise<Notification[]> {
    await this.init();
    return this.db!.getAllFromIndex('notifications', 'by-timestamp');
  }

  async markAsRead(id: string) {
    await this.init();
    const notification = await this.db!.get('notifications', id);
    if (notification) {
      notification.read = true;
      await this.db!.put('notifications', notification);
    }
  }

  async markAllAsRead() {
    await this.init();
    const notifications = await this.getNotifications();
    await Promise.all(
      notifications.map(async (notification) => {
        if (!notification.read) {
          notification.read = true;
          await this.db!.put('notifications', notification);
        }
      })
    );
  }

  async deleteNotification(id: string) {
    await this.init();
    await this.db!.delete('notifications', id);
  }

  async deleteAll() {
    await this.init();
    await this.db!.clear('notifications');
  }

  async getUnreadCount(): Promise<number> {
    await this.init();
    const notifications = await this.getNotifications();
    return notifications.filter(n => !n.read).length;
  }
}

export const notificationService = new NotificationService();