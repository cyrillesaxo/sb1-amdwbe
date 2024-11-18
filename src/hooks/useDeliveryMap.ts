import { useState, useEffect } from 'react';
import { useGoogleMaps } from './useGoogleMaps';

interface UseDeliveryMapProps {
  pickup: google.maps.LatLngLiteral;
  dropoff: google.maps.LatLngLiteral;
}

export function useDeliveryMap({ pickup, dropoff }: UseDeliveryMapProps) {
  const { google, isLoaded } = useGoogleMaps();
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !google || !pickup || !dropoff) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setRoute(result);
          setError(null);
        } else {
          setError('Failed to calculate route');
          setRoute(null);
        }
      }
    );
  }, [isLoaded, google, pickup, dropoff]);

  return { route, error };
}