# Create backup of project files
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "backup_$timestamp"

Write-Host "Creating backup in $backupDir..." -ForegroundColor Green

# Create backup directory
New-Item -ItemType Directory -Force -Path $backupDir

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

# Directories to backup
$dirsToBackup = @(
    "src",
    "scripts",
    "public",
    "config"
)

# Files to backup
$filesToBackup = @(
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

# Backup directories
foreach ($dir in $dirsToBackup) {
    if (Test-Path $dir) {
        Copy-ProjectFiles -source $dir -destination "$backupDir\$dir"
        Write-Host "Backed up directory: $dir" -ForegroundColor Yellow
    }
}

# Backup individual files
foreach ($file in $filesToBackup) {
    if (Test-Path $file) {
        Copy-Item $file -Destination "$backupDir\" -Force
        Write-Host "Backed up file: $file" -ForegroundColor Yellow
    }
}

Write-Host "Backup completed successfully in $backupDir" -ForegroundColor Green
Write-Host "Total files backed up: $((Get-ChildItem -Path $backupDir -Recurse -File).Count)" -ForegroundColor Yellow