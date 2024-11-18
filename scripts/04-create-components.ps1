# Create component files
Write-Host "Creating component files..." -ForegroundColor Green

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

# Create all components
$components = @{
    "src/components/icons/CategoryIcons.tsx" = Get-Content "src/components/icons/CategoryIcons.tsx" -Raw
    "src/components/pages/Home.tsx" = Get-Content "src/components/pages/Home.tsx" -Raw
    "src/components/layout/Navigation.tsx" = Get-Content "src/components/layout/Navigation.tsx" -Raw
    "src/components/delivery/DeliveryRequestForm.tsx" = Get-Content "src/components/delivery/DeliveryRequestForm.tsx" -Raw
}

foreach ($component in $components.GetEnumerator()) {
    Create-File -path $component.Key -content $component.Value
}

Write-Host "Component files created successfully!" -ForegroundColor Green