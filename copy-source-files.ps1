# Script to copy all source files
param (
    [string]$sourceDir = "src"
)

Write-Host "Copying source files..." -ForegroundColor Green

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

# Copy all the source files from the artifact
# Note: You'll need to add the content for each file here
# Example:

$files = @{
    "src/App.tsx" = Get-Content "src/App.tsx" -Raw
    "src/components/maps/GoogleMapsProvider.tsx" = Get-Content "src/components/maps/GoogleMapsProvider.tsx" -Raw
    "src/components/delivery/DeliveryMap.tsx" = Get-Content "src/components/delivery/DeliveryMap.tsx" -Raw
    "src/hooks/useGoogleMaps.ts" = Get-Content "src/hooks/useGoogleMaps.ts" -Raw
    # Add all other files here
}

foreach ($file in $files.GetEnumerator()) {
    Create-File -path $file.Key -content $file.Value
}

Write-Host "Source files copied successfully!" -ForegroundColor Green