# Create store and hooks files
Write-Host "Creating store and hooks files..." -ForegroundColor Green

# Function to create a file with content
function Create-File {
    param (
        [string]$path,
        [string]$content
    )
    $directory = Split-Path $path
    if (!(Test-Path $directory)) {
        New-Item -ItemType Directory -Force -Path $directory
    }
    $content | Set-Content $path -Encoding UTF8
    Write-Host "Created: $path" -ForegroundColor Yellow
}

# Create hooks
$hooks = @{
    "src/hooks/useGoogleMaps.ts" = @'
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from "../config/constants";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: GOOGLE_MAPS_LIBRARIES,
  id: "__googleMapsScriptId"
});

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [google, setGoogle] = useState<typeof window.google | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setLoadError(new Error("Google Maps API key is missing"));
      return;
    }

    loader.load()
      .then((google) => {
        setGoogle(google);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
        setLoadError(error);
      });
  }, []);

  return { isLoaded, loadError, google };
}
'@

    "src/hooks/useDeliveryMap.ts" = @'
import { useState, useEffect } from "react";
import { useGoogleMaps } from "./useGoogleMaps";

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
          setError("Failed to calculate route");
          setRoute(null);
        }
      }
    );
  }, [isLoaded, google, pickup, dropoff]);

  return { route, error };
}
'@
}

foreach ($hook in $hooks.GetEnumerator()) {
    Create-File -path $hook.Key -content $hook.Value
}

Write-Host "Store and hooks files created successfully!" -ForegroundColor Green