import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  stats?: {
    totalDeliveries: number;
    points: number;
    totalSpent: string;
    rating: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize with mock user data
  const [user] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: 'https://source.unsplash.com/random/200x200?face',
    stats: {
      totalDeliveries: 15,
      points: 1250,
      totalSpent: '245,000 FCFA',
      rating: 4.85
    }
  });

  const login = async (email: string, password: string) => {
    // Mock login implementation
  };

  const logout = () => {
    // Mock logout implementation
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}