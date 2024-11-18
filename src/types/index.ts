export type Language = 
  | 'en' 
  | 'es' 
  | 'fr' 
  | 'sw'  // Swahili
  | 'ha'  // Hausa
  | 'eto' // Eton
  | 'bas' // Basaa
  | 'dua' // Duala
  | 'ewo' // Ewondo
  | 'bafang'
  | 'bagangte'
  | 'bamoun';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Package {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  image?: File;
}

export interface DeliveryRequest {
  id?: string;
  userId: string;
  pickup: Location;
  dropoff: Location;
  package: Package;
  vehicleType: 'car' | 'van' | 'truck';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Contact {
  phone: string;
  email: string;
  alternateEmail?: string;
}

export interface Company {
  name: string;
  taxId: string;
  fleet: Array<{
    type: string;
    count: number;
    capacity: string;
  }>;
  insurance: {
    provider: string;
    coverage: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'sender' | 'bidder';
  profileImage?: string;
  address?: Address;
  contact?: Contact;
  company?: Company;
}

export interface MapConfig {
  center: google.maps.LatLngLiteral;
  zoom: number;
}