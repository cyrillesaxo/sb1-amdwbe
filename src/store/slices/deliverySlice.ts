import { StateCreator } from 'zustand';
import { api } from '../../api';
import { DeliveryRequest } from '../../types';

export interface DeliverySlice {
  deliveries: DeliveryRequest[];
  loading: boolean;
  error: string | null;
  addDeliveryRequest: (delivery: Omit<DeliveryRequest, 'id'>) => Promise<void>;
  updateDeliveryStatus: (id: string, status: string) => Promise<void>;
}

export const createDeliverySlice: StateCreator<DeliverySlice> = (set, get) => ({
  deliveries: [],
  loading: false,
  error: null,

  addDeliveryRequest: async (delivery) => {
    set({ loading: true, error: null });
    try {
      const newDelivery = await api.createDelivery(delivery);
      set((state) => ({
        deliveries: [...state.deliveries, newDelivery],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateDeliveryStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await api.updateDeliveryStatus(id, status);
      set((state) => ({
        deliveries: state.deliveries.map((delivery) =>
          delivery.id === id ? { ...delivery, status } : delivery
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
});