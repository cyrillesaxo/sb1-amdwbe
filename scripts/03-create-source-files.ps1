# Create source files
Write-Host "Creating source files..." -ForegroundColor Green

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

# Create src/index.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-height: 100vh;
  background-color: #f3f4f6;
}

#root {
  min-height: 100vh;
}

/* Google Maps container styles */
.map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Ensure the map takes full height of its container */
.gm-style {
  height: 100% !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* Animation classes */
.animate-spin-slow {
  animation: spin 2s linear infinite;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
"@ | Set-Content "src/index.css"

# Create src/config/constants.ts
@"
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const GOOGLE_MAPS_LIBRARIES = ['places', 'geometry', 'drawing'] as const;

// Map Default Center (Douala, Cameroon)
export const MAP_DEFAULT_CENTER = {
  lat: 4.0511,
  lng: 9.7679
};

export const MAP_DEFAULT_ZOOM = 13;

export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#4a5568" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    }
  ],
  gestureHandling: 'greedy',
  maxZoom: 18,
  minZoom: 3
};
"@ | Set-Content "src/config/constants.ts"

Write-Host "Source files created successfully!" -ForegroundColor Green