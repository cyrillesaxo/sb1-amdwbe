import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoyaltyState {
  points: number;
  tier: 'bronze' | 'silver' | 'gold';
  history: {
    id: string;
    date: string;
    points: number;
    type: 'earned' | 'redeemed';
    description: string;
  }[];
  addPoints: (amount: number, description: string) => void;
  redeemPoints: (amount: number, description: string) => void;
  calculateTier: (points: number) => 'bronze' | 'silver' | 'gold';
}

export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      points: 0,
      tier: 'bronze',
      history: [],

      addPoints: (amount, description) => {
        set(state => {
          const newPoints = state.points + amount;
          return {
            points: newPoints,
            tier: get().calculateTier(newPoints),
            history: [
              {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                points: amount,
                type: 'earned',
                description
              },
              ...state.history
            ]
          };
        });
      },

      redeemPoints: (amount, description) => {
        set(state => {
          if (state.points < amount) return state;

          const newPoints = state.points - amount;
          return {
            points: newPoints,
            tier: get().calculateTier(newPoints),
            history: [
              {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                points: amount,
                type: 'redeemed',
                description
              },
              ...state.history
            ]
          };
        });
      },

      calculateTier: (points) => {
        if (points >= 1000) return 'gold';
        if (points >= 500) return 'silver';
        return 'bronze';
      }
    }),
    {
      name: 'loyalty-store'
    }
  )
);