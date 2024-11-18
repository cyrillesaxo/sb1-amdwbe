// Update the socialLogin function in api/index.ts
export const api = {
  // ... other methods

  socialLogin: async (provider: string): Promise<User> => {
    // In a real application, this would redirect to the provider's OAuth flow
    // For demo purposes, we'll simulate a successful login
    const mockUser = {
      id: Date.now().toString(),
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `user@${provider}.com`,
      role: 'sender',
      profileImage: `https://source.unsplash.com/random/200x200?face&${provider}`,
      stats: {
        deliveries: 0,
        rating: 0,
        totalSpent: 0,
        activeDeliveries: 0
      }
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return mockUser;
  },
};