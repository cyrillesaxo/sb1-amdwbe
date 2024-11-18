import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, DeliveryRequest } from '../types';

interface StoreState {
  user: User | null;
  loading: boolean;
  error: string | null;
  deliveries: DeliveryRequest[];
  
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'sender' | 'bidder') => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  
  addDeliveryRequest: (delivery: Omit<DeliveryRequest, 'id'>) => Promise<void>;
  updateDeliveryStatus: (id: string, status: string) => Promise<void>;
}

// Demo user data
const demoUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'sender',
  profileImage: 'https://source.unsplash.com/random/200x200?face',
  address: {
    street: '123 Main Street',
    city: 'Douala',
    state: 'Littoral',
    country: 'Cameroon',
    zip: '12345'
  },
  contact: {
    phone: '+237 699 123 456',
    email: 'john.doe@example.com',
    alternateEmail: 'john.business@example.com'
  },
  company: {
    name: "John's Electronics",
    taxId: 'CAM123456789',
    type: 'Retail',
    address: '456 Commerce Street, Douala',
    fleet: [
      { type: 'Car', count: 5, capacity: '500kg' },
      { type: 'Van', count: 3, capacity: '1000kg' },
      { type: 'Truck', count: 2, capacity: '2000kg' }
    ],
    insurance: {
      provider: 'SafeGuard Insurance',
      coverage: '10,000,000 FCFA'
    }
  },
  paymentMethods: [
    {
      id: 'pm1',
      type: 'mobile_money',
      provider: 'Orange Money',
      number: '+237 699 123 456',
      primary: true,
      balance: '150,000 FCFA'
    },
    {
      id: 'pm2',
      type: 'mobile_money',
      provider: 'MTN Mobile Money',
      number: '+237 677 987 654',
      primary: false,
      balance: '85,000 FCFA'
    },
    {
      id: 'pm3',
      type: 'credit_card',
      provider: 'Visa',
      number: '**** **** **** 4242',
      expiry: '12/25',
      primary: false
    }
  ],
  preferences: {
    language: 'fr',
    currency: 'XAF',
    theme: 'light',
    notifications: {
      email: true,
      sms: true,
      push: false
    }
  },
  stats: {
    totalDeliveries: 15,
    totalSpent: '245,000 FCFA',
    averageRating: 4.8,
    memberSince: '2023-09-15',
    loyaltyPoints: 1250,
    loyaltyTier: 'gold'
  },
  savedLocations: [
    {
      id: 'loc1',
      name: 'Home',
      address: '123 Main Street, Bonapriso',
      lat: 4.0511,
      lng: 9.7679
    },
    {
      id: 'loc2',
      name: 'Office',
      address: '456 Commerce Street, Bonanjo',
      lat: 4.0531,
      lng: 9.7699
    },
    {
      id: 'loc3',
      name: 'Shop',
      address: '789 Market Road, Akwa',
      lat: 4.0521,
      lng: 9.7689
    }
  ]
};

// Demo deliveries
const demoDeliveries: DeliveryRequest[] = [
  {
    id: 'd1',
    userId: '1',
    type: 'express',
    status: 'in_progress',
    pickup: {
      address: 'Douala Central Market',
      lat: 4.0511,
      lng: 9.7679
    },
    dropoff: {
      address: 'Bonapriso Mall',
      lat: 4.0611,
      lng: 9.7779
    },
    package: {
      description: 'Electronics',
      weight: 2.5,
      dimensions: { length: 30, width: 20, height: 15 },
      value: 150000,
      requiresSpecialHandling: true
    },
    amount: '7,500 FCFA',
    date: '2024-03-15T10:30:00Z',
    driver: {
      name: 'Jean Paul',
      rating: 4.8,
      vehicle: 'Toyota Hilux',
      eta: '15 min'
    }
  },
  {
    id: 'd2',
    userId: '1',
    type: 'standard',
    status: 'completed',
    pickup: {
      address: 'Akwa Shopping Center',
      lat: 4.0531,
      lng: 9.7699
    },
    dropoff: {
      address: 'Bonanjo Business District',
      lat: 4.0631,
      lng: 9.7799
    },
    package: {
      description: 'Documents',
      weight: 0.5,
      dimensions: { length: 30, width: 21, height: 1 },
      value: 25000,
      requiresSpecialHandling: false
    },
    amount: '5,000 FCFA',
    date: '2024-03-10T14:45:00Z',
    rating: 4,
    driver: {
      name: 'Marie Claire',
      rating: 4.9,
      vehicle: 'Honda Motorcycle'
    }
  }
];

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: demoUser,
      loading: false,
      error: null,
      deliveries: demoDeliveries,

      login: async () => {
        set({ user: demoUser });
      },

      signup: async () => {
        set({ user: demoUser });
      },

      socialLogin: async () => {
        set({ user: demoUser });
      },

      logout: () => set({ user: null }),
      
      setUser: (user) => set({ user }),

      addDeliveryRequest: async (delivery) => {
        set((state) => ({
          deliveries: [...state.deliveries, { ...delivery, id: Date.now().toString() }]
        }));
      },

      updateDeliveryStatus: async (id, status) => {
        set((state) => ({
          deliveries: state.deliveries.map((d) =>
            d.id === id ? { ...d, status } : d
          )
        }));
      },
    }),
    {
      name: 'delivery-store',
      version: 1,
    }
  )
);

export const useUser = () => {
  const store = useStore();
  return {
    user: store.user,
    loading: store.loading,
    error: store.error,
    login: store.login,
    signup: store.signup,
    socialLogin: store.socialLogin,
    logout: store.logout,
    setUser: store.setUser,
  };
};

export const useDeliveryStore = () => {
  const store = useStore();
  return {
    deliveries: store.deliveries,
    loading: store.loading,
    error: store.error,
    addDeliveryRequest: store.addDeliveryRequest,
    updateDeliveryStatus: store.updateDeliveryStatus,
  };
};

export default useStore;