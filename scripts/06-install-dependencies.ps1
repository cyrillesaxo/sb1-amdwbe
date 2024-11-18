# Install project dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Green

# Create package.json with all required dependencies
$packageJson = @{
    name = "gopack-delivery"
    private = $true
    version = "0.0.0"
    type = "module"
    scripts = @{
        dev = "vite"
        build = "vitest run && tsc && vite build"
        lint = "eslint ."
        preview = "vite preview"
        server = "json-server --watch db.json --port 3000"
        test = "vitest"
        "test:coverage" = "vitest run --coverage"
        "test:ui" = "vitest --ui"
        precommit = "npm run test && npm run lint"
    }
    dependencies = @{
        "@googlemaps/js-api-loader" = "^1.16.6"
        "@googlemaps/react-wrapper" = "^1.1.35"
        "@auth0/auth0-react" = "^2.2.4"
        "lucide-react" = "^0.344.0"
        "react" = "^18.3.1"
        "react-dom" = "^18.3.1"
        "react-router-dom" = "^6.22.3"
        "zustand" = "^4.5.2"
        "socket.io-client" = "^4.7.4"
        "json-server" = "^1.0.0-alpha.23"
        "@fingerprintjs/fingerprintjs" = "^4.2.1"
        "firebase" = "^10.8.0"
        "twilio" = "^4.22.0"
        "stripe" = "^14.17.0"
    }
    devDependencies = @{
        "@testing-library/jest-dom" = "^6.4.2"
        "@testing-library/react" = "^14.2.1"
        "@testing-library/user-event" = "^14.5.2"
        "@types/google.maps" = "^3.55.4"
        "@types/react" = "^18.3.5"
        "@types/react-dom" = "^18.3.0"
        "@vitejs/plugin-react" = "^4.3.1"
        "@vitest/coverage-v8" = "^1.3.1"
        "@vitest/ui" = "^1.3.1"
        "autoprefixer" = "^10.4.18"
        "jsdom" = "^24.0.0"
        "postcss" = "^8.4.35"
        "tailwindcss" = "^3.4.1"
        "typescript" = "^5.5.3"
        "vite" = "^5.4.2"
        "vitest" = "^1.3.1"
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

# Install dependencies
npm install

Write-Host "Dependencies installed successfully!" -ForegroundColor Green