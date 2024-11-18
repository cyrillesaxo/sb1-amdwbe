import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { MapLoadingState } from './MapLoadingState';
import { MapErrorState } from './MapErrorState';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, MAP_OPTIONS } from '../../config/constants';

interface MapContainerProps {
  onMapLoad?: (map: google.maps.Map) => void;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  children?: React.ReactNode;
}

export function MapContainer({ 
  onMapLoad, 
  center = MAP_DEFAULT_CENTER,
  zoom = MAP_DEFAULT_ZOOM,
  children 
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError, google } = useGoogleMaps();
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !google || !mapRef.current) return;

    // Clear any existing map instance
    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      mapInstanceRef.current = null;
    }

    // Create new map instance
    const map = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center,
      zoom,
    });

    mapInstanceRef.current = map;
    onMapLoad?.(map);

    // Handle window resize
    const handleResize = () => {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    };

    window.addEventListener('resize', handleResize);

    // Force a resize after initialization
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        mapInstanceRef.current = null;
      }
    };
  }, [isLoaded, google, center, zoom, onMapLoad]);

  if (loadError) {
    return <MapErrorState error={loadError} />;
  }

  if (!isLoaded) {
    return <MapLoadingState />;
  }

  return (
    <div className="relative w-full h-full" style={{ minHeight: '500px' }}>
      <div 
        ref={mapRef} 
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ 
          height: '100%',
          width: '100%'
        }}
      />
      {children}
    </div>
  );
}