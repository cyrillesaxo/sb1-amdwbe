export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'sender',
  profileImage: 'https://example.com/profile.jpg'
};

export const mockDelivery = {
  id: 'd1',
  userId: '1',
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
  status: 'pending',
  package: {
    weight: 5,
    dimensions: {
      length: 20,
      width: 15,
      height: 10
    },
    description: 'Electronics'
  },
  vehicleType: 'car',
  createdAt: new Date().toISOString()
};

export const mockTheme = {
  theme: 'light',
  customColors: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937'
  }
};