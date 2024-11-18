import { StateCreator } from 'zustand';
import { api } from '../../api';
import { User } from '../../types';

export interface UserSlice {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'sender' | 'bidder') => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await api.login(email, password);
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signup: async (name, email, password, role) => {
    set({ loading: true, error: null });
    try {
      const user = await api.signup({ name, email, password, role });
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  socialLogin: async (provider) => {
    set({ loading: true, error: null });
    try {
      const user = await api.socialLogin(provider);
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});