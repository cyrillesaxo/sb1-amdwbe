export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, show update notification
            showUpdateNotification();
          }
        });
      });

      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      // Don't throw, gracefully degrade without service worker
      return null;
    }
  }
  return null;
}

function showUpdateNotification() {
  const event = new CustomEvent('swUpdate', {
    detail: {
      message: 'New version available. Refresh to update.',
      timestamp: new Date().toISOString()
    }
  });
  window.dispatchEvent(event);
}