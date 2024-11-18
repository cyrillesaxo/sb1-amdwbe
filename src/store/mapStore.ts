import { create } from 'zustand';

interface MapState {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
}));