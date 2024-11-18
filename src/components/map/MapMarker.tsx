import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Location } from '../../store/useStore';

interface MapMarkerProps {
  position: Location;
  type: 'pickup' | 'dropoff';
  title: string;
}

export function MapMarker({ position, type, title }: MapMarkerProps) {
  const icon = {
    url: `https://maps.google.com/mapfiles/ms/icons/${type === 'pickup' ? 'green' : 'red'}-dot.png`,
    scaledSize: new window.google.maps.Size(32, 32),
  };

  return (
    <Marker
      position={{
        lat: position.latitude,
        lng: position.longitude,
      }}
      icon={icon}
      title={title}
    />
  );
}