export class ServiceWorkerService {
  private registration: ServiceWorkerRegistration | null = null;

  public async register(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      this.handleRegistration();
      this.setupUpdateHandling();
      await this.registerPushNotifications();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  private handleRegistration() {
    if (!this.registration) return;

    if (this.registration.installing) {
      console.log('Service Worker installing');
    } else if (this.registration.waiting) {
      console.log('Service Worker installed');
    } else if (this.registration.active) {
      console.log('Service Worker active');
    }
  }

  private setupUpdateHandling() {
    if (!this.registration) return;

    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration?.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.notifyUpdate();
        }
      });
    });

    // Check for updates every hour
    setInterval(() => {
      this.checkForUpdates();
    }, 60 * 60 * 1000);
  }

  private async checkForUpdates() {
    try {
      await this.registration?.update();
    } catch (error) {
      console.error('Error checking for Service Worker updates:', error);
    }
  }

  private notifyUpdate() {
    const event = new CustomEvent('swUpdate', {
      detail: {
        message: 'New version available. Please refresh to update.',
        timestamp: new Date().toISOString()
      }
    });
    window.dispatchEvent(event);
  }

  private async registerPushNotifications() {
    try {
      if (!this.registration) return;

      const permission = await this.requestNotificationPermission();
      if (permission !== 'granted') return;

      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
      });

      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });
    } catch (error) {
      console.error('Failed to register push notifications:', error);
    }
  }

  private async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    try {
      return await Notification.requestPermission();
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  public async unregister(): Promise<void> {
    try {
      if (this.registration) {
        await this.registration.unregister();
        this.registration = null;
      }
    } catch (error) {
      console.error('Error unregistering Service Worker:', error);
    }
  }
}

export const serviceWorkerService = new ServiceWorkerService();