import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from '../../config/constants';
import { MapLoadingState } from './MapLoadingState';
import { MapErrorState } from './MapErrorState';

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const render = (status: string) => {
    switch (status) {
      case 'LOADING':
        return <MapLoadingState />;
      case 'FAILURE':
        return <MapErrorState error="Failed to load Google Maps" />;
      case 'SUCCESS':
        return <>{children}</>;
      default:
        return <MapErrorState error={`Unknown status: ${status}`} />;
    }
  };

  return (
    <Wrapper 
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
      version="weekly"
      render={render}
    >
      {children}
    </Wrapper>
  );
}