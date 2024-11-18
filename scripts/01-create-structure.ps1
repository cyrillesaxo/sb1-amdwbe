# Create project structure
Write-Host "Creating project structure..." -ForegroundColor Green

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
    "src/components/pages",
    "src/components/icons",
    "src/hooks",
    "src/store",
    "src/store/slices",
    "src/types",
    "src/websocket",
    "src/server",
    "src/config",
    "src/config/i18n/translations",
    "src/api",
    "public",
    "scripts",
    "src/tests/components",
    "src/tests/hooks",
    "src/tests/store",
    "src/tests/features",
    "src/tests/stories",
    "src/tests/utils"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
    Write-Host "Created directory: $dir" -ForegroundColor Yellow
}

Write-Host "Project structure created successfully!" -ForegroundColor Green