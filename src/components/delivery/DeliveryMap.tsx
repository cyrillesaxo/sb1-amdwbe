import React, { useEffect, useState } from 'react';
import { X, Navigation as NavigationIcon } from 'lucide-react';
import { MapContainer } from '../maps/MapContainer';
import { useI18nStore } from '../../store/i18nStore';

interface DeliveryMapProps {
  pickup: google.maps.LatLngLiteral;
  dropoff: google.maps.LatLngLiteral;
  onClose: () => void;
}

export function DeliveryMap({ pickup, dropoff, onClose }: DeliveryMapProps) {
  const { t } = useI18nStore();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Initialize directions renderer
    const renderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#4F46E5',
        strokeWeight: 6,
        strokeOpacity: 0.8,
      },
    });
    renderer.setMap(map);
    setDirectionsRenderer(renderer);

    // Add markers
    const pickupMarker = new google.maps.Marker({
      position: pickup,
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

    const dropoffMarker = new google.maps.Marker({
      position: dropoff,
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

    // Calculate route
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          renderer.setDirections(result);
          
          // Fit bounds to show the entire route
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(pickup);
          bounds.extend(dropoff);
          map.fitBounds(bounds);
        }
      }
    );

    return () => {
      pickupMarker.setMap(null);
      dropoffMarker.setMap(null);
      renderer.setMap(null);
    };
  }, [map, pickup, dropoff]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {t('delivery.trackDelivery')}
        </h2>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>
      
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          onMapLoad={setMap}
          center={pickup}
          zoom={14}
        />
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {t('delivery.findingDrivers')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('delivery.searchingDrivers')}
            </p>
          </div>
          <NavigationIcon className="h-6 w-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}