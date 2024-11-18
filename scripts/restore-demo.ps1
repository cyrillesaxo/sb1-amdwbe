# Restore demo version from backup
param (
    [Parameter(Mandatory=$true)]
    [string]$backupDir
)

Write-Host "Restoring demo from $backupDir..." -ForegroundColor Green

# Function to copy files with directory structure
function Copy-ProjectFiles {
    param (
        [string]$source,
        [string]$destination
    )
    
    # Create destination directory if it doesn't exist
    if (!(Test-Path $destination)) {
        New-Item -ItemType Directory -Force -Path $destination
    }
    
    # Copy all files and directories
    Get-ChildItem -Path $source -Recurse | ForEach-Object {
        $targetPath = $_.FullName.Replace($source, $destination)
        
        if ($_.PSIsContainer) {
            # Create directory
            if (!(Test-Path $targetPath)) {
                New-Item -ItemType Directory -Force -Path $targetPath
            }
        } else {
            # Copy file
            Copy-Item $_.FullName -Destination $targetPath -Force
        }
    }
}

# Check if backup directory exists
if (!(Test-Path $backupDir)) {
    Write-Host "Error: Backup directory not found: $backupDir" -ForegroundColor Red
    exit 1
}

# Directories to restore
$dirsToRestore = @(
    "src",
    "scripts",
    "public",
    "config"
)

# Files to restore
$filesToRestore = @(
    "package.json",
    "tsconfig.json",
    "tsconfig.node.json",
    "vite.config.ts",
    "index.html",
    "tailwind.config.js",
    "postcss.config.js",
    ".env",
    "db.json",
    "netlify.toml"
)

# Restore directories
foreach ($dir in $dirsToRestore) {
    $backupPath = Join-Path $backupDir $dir
    if (Test-Path $backupPath) {
        Copy-ProjectFiles -source $backupPath -destination $dir
        Write-Host "Restored directory: $dir" -ForegroundColor Yellow
    }
}

# Restore individual files
foreach ($file in $filesToRestore) {
    $backupFile = Join-Path $backupDir $file
    if (Test-Path $backupFile) {
        Copy-Item $backupFile -Destination $file -Force
        Write-Host "Restored file: $file" -ForegroundColor Yellow
    }
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Demo restoration completed successfully!" -ForegroundColor Green
Write-Host "Run 'npm run dev' to start the demo" -ForegroundColor Yellow