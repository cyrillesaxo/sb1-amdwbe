import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DeliveryDB extends DBSchema {
  deliveries: {
    key: string;
    value: any;
    indexes: { 'by-status': string };
  };
  syncQueue: {
    key: string;
    value: {
      action: 'create' | 'update' | 'delete';
      data: any;
      timestamp: number;
    };
  };
}

class OfflineSync {
  private db: IDBPDatabase<DeliveryDB> | null = null;

  async init() {
    this.db = await openDB<DeliveryDB>('gopack-offline', 1, {
      upgrade(db) {
        // Create stores
        const deliveryStore = db.createObjectStore('deliveries', {
          keyPath: 'id'
        });
        deliveryStore.createIndex('by-status', 'status');

        db.createObjectStore('syncQueue', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }

  async saveDelivery(delivery: any) {
    if (!this.db) await this.init();
    await this.db!.put('deliveries', delivery);
    
    // Add to sync queue
    await this.db!.add('syncQueue', {
      action: 'create',
      data: delivery,
      timestamp: Date.now()
    });

    // Try to sync if online
    if (navigator.onLine) {
      this.syncWithServer();
    }
  }

  async getDeliveries() {
    if (!this.db) await this.init();
    return this.db!.getAll('deliveries');
  }

  async syncWithServer() {
    if (!this.db) await this.init();
    
    const queue = await this.db!.getAll('syncQueue');
    
    for (const item of queue) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        
        // Remove from queue after successful sync
        await this.db!.delete('syncQueue', item.id);
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  }
}

export const offlineSync = new OfflineSync();

// Listen for online/offline events
window.addEventListener('online', () => {
  offlineSync.syncWithServer();
});