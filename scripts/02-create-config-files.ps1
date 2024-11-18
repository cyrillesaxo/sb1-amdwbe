# Create configuration files
param (
    [string]$googleMapsApiKey = "AIzaSyC58kSIm3luVrerFb7KO5AzQC7jkzCjbBM"
)

Write-Host "Creating configuration files..." -ForegroundColor Green

# Create .env file
@"
VITE_GOOGLE_MAPS_API_KEY=$googleMapsApiKey
VITE_GOOGLE_MAPS_LIBRARIES=places,geometry,drawing
"@ | Set-Content ".env"

# Create vite.config.ts
@"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
"@ | Set-Content "vite.config.ts"

# Create tsconfig.json
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

# Create tsconfig.node.json
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

# Create tailwind.config.js
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

# Create postcss.config.js
@"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@ | Set-Content "postcss.config.js"

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

Write-Host "Configuration files created successfully!" -ForegroundColor Green