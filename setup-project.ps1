# Main setup script
param (
    [string]$projectName = "gopack-delivery",
    [string]$googleMapsApiKey = "AIzaSyC58kSIm3luVrerFb7KO5AzQC7jkzCjbBM"
)

Write-Host "Setting up $projectName project..." -ForegroundColor Green

# Create project directory and navigate to it
New-Item -ItemType Directory -Force -Path $projectName
Set-Location $projectName

# Run all setup scripts in order
Write-Host "Running setup scripts..." -ForegroundColor Green

./scripts/01-create-structure.ps1
./scripts/02-create-config-files.ps1 -googleMapsApiKey $googleMapsApiKey
./scripts/03-create-source-files.ps1
./scripts/04-create-components.ps1
./scripts/05-setup-store-and-hooks.ps1
./scripts/06-install-dependencies.ps1
./scripts/07-start-services.ps1

Write-Host "Project setup completed successfully!" -ForegroundColor Green
Write-Host "Project is ready at: $(Get-Location)" -ForegroundColor Yellow