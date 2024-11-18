import React, { useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { MapLoadingState } from './MapLoadingState';
import { MapErrorState } from './MapErrorState';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, MAP_OPTIONS } from '../../config/constants';

interface MapContainerProps {
  onMapLoad?: (map: google.maps.Map) => void;
  className?: string;
}

export function MapContainer({ onMapLoad, className = 'h-screen' }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError, google } = useGoogleMaps();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !google || !mapRef.current || map) return;

    const newMap = new google.maps.Map(mapRef.current, {
      ...MAP_OPTIONS,
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#666666" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    setMap(newMap);
    onMapLoad?.(newMap);

  }, [isLoaded, google, map, onMapLoad]);

  if (loadError) {
    return <MapErrorState error={loadError} />;
  }

  if (!isLoaded) {
    return <MapLoadingState />;
  }

  return (
    <div 
      ref={mapRef} 
      className={`w-full ${className}`}
    />
  );
}