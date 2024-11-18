import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, MAP_LIBRARIES } from '../config/constants';

export function useMapLoader() {
  const [mapLoader, setMapLoader] = useState<Loader | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError('Google Maps API key is missing');
      return;
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "beta",
      libraries: MAP_LIBRARIES
    });

    setMapLoader(loader);

    loader.load().catch((err) => {
      console.error('Error loading Google Maps:', err);
      setError(err.message);
    });
  }, []);

  return { mapLoader, error };
}