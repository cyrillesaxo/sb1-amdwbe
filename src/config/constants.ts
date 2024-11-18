import { MapTypeStyle } from '@googlemaps/maps-types';

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const GOOGLE_MAPS_LIBRARIES = ['places', 'geometry', 'drawing'] as const;

// Map Default Center (Douala, Cameroon)
export const MAP_DEFAULT_CENTER = {
  lat: 4.0511,
  lng: 9.7679
};

export const MAP_DEFAULT_ZOOM = 13;

export const MAP_STYLES: MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4a5568" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#bee3f8" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f7fafc" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#edf2f7" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e2e8f0" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#edf2f7" }]
  }
];

export const MAP_OPTIONS = {
  styles: MAP_STYLES,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  maxZoom: 18,
  minZoom: 3,
  backgroundColor: '#f7fafc'
};