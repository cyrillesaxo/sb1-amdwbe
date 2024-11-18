import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReferralState {
  referralCode: string;
  referrals: {
    id: string;
    email: string;
    status: 'pending' | 'completed';
    date: string;
    reward?: number;
  }[];
  generateReferralCode: () => string;
  addReferral: (email: string) => void;
  completeReferral: (id: string, reward: number) => void;
  getTotalRewards: () => number;
}

export const useReferralStore = create<ReferralState>()(
  persist(
    (set, get) => ({
      referralCode: '',
      referrals: [],

      generateReferralCode: () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        set({ referralCode: code });
        return code;
      },

      addReferral: (email) => {
        set(state => ({
          referrals: [
            {
              id: Date.now().toString(),
              email,
              status: 'pending',
              date: new Date().toISOString()
            },
            ...state.referrals
          ]
        }));
      },

      completeReferral: (id, reward) => {
        set(state => ({
          referrals: state.referrals.map(ref =>
            ref.id === id
              ? { ...ref, status: 'completed', reward }
              : ref
          )
        }));
      },

      getTotalRewards: () => {
        return get().referrals.reduce((total, ref) => total + (ref.reward || 0), 0);
      }
    }),
    {
      name: 'referral-store'
    }
  )
);