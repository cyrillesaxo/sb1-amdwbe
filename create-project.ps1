# Main script to create the delivery system project
param (
    [string]$projectName = "delivery-management-system",
    [string]$googleMapsApiKey = "AIzaSyC58kSIm3luVrerFb7KO5AzQC7jkzCjbBM"
)

Write-Host "Creating $projectName project..." -ForegroundColor Green

# Create project directory and navigate to it
New-Item -ItemType Directory -Force -Path $projectName
Set-Location $projectName

# Create base directory structure
$directories = @(
    "src/components/layout",
    "src/components/map",
    "src/components/delivery",
    "src/components/settings",
    "src/components/integrations",
    "src/components/auth",
    "src/components/maps",
    "src/components/profile",
    "src/hooks",
    "src/store",
    "src/types",
    "src/websocket",
    "src/server",
    "src/config",
    "src/config/i18n/translations",
    "src/api",
    "public"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
    Write-Host "Created directory: $dir" -ForegroundColor Yellow
}

# Create .env file
@"
VITE_GOOGLE_MAPS_API_KEY=$googleMapsApiKey
"@ | Set-Content ".env"

# Create package.json
$packageJson = @{
    name = $projectName
    private = $true
    version = "0.0.0"
    type = "module"
    scripts = @{
        dev = "vite"
        build = "vite build"
        lint = "eslint ."
        preview = "vite preview"
        server = "json-server --watch db.json --port 3000"
    }
    dependencies = @{
        "@googlemaps/js-api-loader" = "^1.16.6"
        "@googlemaps/react-wrapper" = "^1.1.35"
        "lucide-react" = "^0.344.0"
        "react" = "^18.3.1"
        "react-dom" = "^18.3.1"
        "react-router-dom" = "^6.22.3"
        "zustand" = "^4.5.2"
        "socket.io-client" = "^4.7.4"
        "json-server" = "^1.0.0-alpha.23"
    }
    devDependencies = @{
        "@types/google.maps" = "^3.55.4"
        "@types/react" = "^18.3.5"
        "@types/react-dom" = "^18.3.0"
        "@vitejs/plugin-react" = "^4.3.1"
        "autoprefixer" = "^10.4.18"
        "eslint" = "^9.9.1"
        "postcss" = "^8.4.35"
        "tailwindcss" = "^3.4.1"
        "typescript" = "^5.5.3"
        "vite" = "^5.4.2"
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

# Create configuration files
@"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
};
"@ | Set-Content "tailwind.config.js"

@"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@ | Set-Content "postcss.config.js"

@"
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
"@ | Set-Content "tsconfig.json"

@"
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
"@ | Set-Content "tsconfig.node.json"

@"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
"@ | Set-Content "vite.config.ts"

# Create index.html
@"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GoPack - Fast & Reliable Delivery Service</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"@ | Set-Content "index.html"

# Copy all the source files
# Note: You'll need to copy the content of each file from the artifact
# Here's an example for a few key files:

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
"@ | Set-Content "src/index.css"

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Project setup complete!" -ForegroundColor Green
Write-Host "To start the development server, run: npm run dev" -ForegroundColor Yellow