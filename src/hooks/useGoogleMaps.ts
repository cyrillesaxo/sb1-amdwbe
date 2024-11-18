import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from '../config/constants';

// Create a singleton loader instance
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: GOOGLE_MAPS_LIBRARIES,
  id: '__googleMapsScriptId'
});

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [google, setGoogle] = useState<typeof window.google | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setLoadError(new Error('Google Maps API key is missing'));
      return;
    }

    loader.load()
      .then((google) => {
        setGoogle(google);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
        setLoadError(error);
      });
  }, []);

  return { isLoaded, loadError, google };
}