import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmergencyState {
  loading: boolean;
  error: string | null;
  emergencyContacts: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  triggerSOS: () => Promise<void>;
  addEmergencyContact: (contact: { name: string; phone: string; relationship: string }) => void;
  removeEmergencyContact: (phone: string) => void;
}

export const useEmergencyStore = create<EmergencyState>()(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      emergencyContacts: [],

      triggerSOS: async () => {
        set({ loading: true, error: null });
        try {
          // Get current location
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          // Send SOS alert to emergency contacts
          const contacts = get().emergencyContacts;
          await Promise.all(
            contacts.map(contact => 
              fetch('/api/emergency/notify', {
                method: 'POST',
                body: JSON.stringify({
                  contact,
                  location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }
                })
              })
            )
          );

          // Notify emergency support team
          await fetch('/api/emergency/support', {
            method: 'POST',
            body: JSON.stringify({
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          });

          set({ loading: false });
        } catch (error) {
          set({ loading: false, error: error.message });
        }
      },

      addEmergencyContact: (contact) => {
        set(state => ({
          emergencyContacts: [...state.emergencyContacts, contact]
        }));
      },

      removeEmergencyContact: (phone) => {
        set(state => ({
          emergencyContacts: state.emergencyContacts.filter(c => c.phone !== phone)
        }));
      }
    }),
    {
      name: 'emergency-store'
    }
  )
);