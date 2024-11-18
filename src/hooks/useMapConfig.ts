import { useState, useCallback } from 'react';
import { MapConfig } from '../types';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '../config/constants';

export function useMapConfig() {
  const [mapConfig, setMapConfig] = useState<MapConfig>({
    center: MAP_DEFAULT_CENTER,
    zoom: MAP_DEFAULT_ZOOM,
  });

  const updateMapConfig = useCallback((newConfig: Partial<MapConfig>) => {
    setMapConfig(prev => ({
      ...prev,
      ...newConfig,
    }));
  }, []);

  return {
    mapConfig,
    updateMapConfig,
  };
}