import React, { useEffect, useRef, useState } from 'react';
import { useMapStore } from '../../store/mapStore';
import { MapPin } from 'lucide-react';
import { Location } from '../../types';

interface DeliveryMapProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
  showRoute?: boolean;
  onMapLoad?: (map: google.maps.Map) => void;
}

export function DeliveryMap({ 
  pickupLocation, 
  dropoffLocation, 
  showRoute = true,
  onMapLoad 
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMapStore((state) => state.map);
  const setMap = useMapStore((state) => state.setMap);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ],
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    setMap(newMap);
    if (onMapLoad) onMapLoad(newMap);

    return () => {
      setMap(null);
    };
  }, [map, setMap, onMapLoad]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers: google.maps.Marker[] = [];

    if (pickupLocation) {
      const pickupMarker = new google.maps.Marker({
        position: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#22C55E',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: 'Pickup Location'
      });
      newMarkers.push(pickupMarker);
    }

    if (dropoffLocation) {
      const dropoffMarker = new google.maps.Marker({
        position: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: 'Dropoff Location'
      });
      newMarkers.push(dropoffMarker);
    }

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()!));
      map.fitBounds(bounds);
    }
  }, [map, pickupLocation, dropoffLocation]);

  useEffect(() => {
    if (!map || !pickupLocation || !dropoffLocation || !showRoute) return;

    if (!directionsRenderer) {
      const renderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#3B82F6',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });
      renderer.setMap(map);
      setDirectionsRenderer(renderer);
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        destination: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && directionsRenderer) {
          directionsRenderer.setDirections(result);
        }
      }
    );

    return () => {
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
        setDirectionsRenderer(null);
      }
    };
  }, [map, pickupLocation, dropoffLocation, showRoute, directionsRenderer]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ border: '1px solid #e5e7eb' }}
      />
      
      {/* Location Labels */}
      {pickupLocation && dropoffLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-gray-600">
              {pickupLocation.address}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-gray-600">
              {dropoffLocation.address}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}