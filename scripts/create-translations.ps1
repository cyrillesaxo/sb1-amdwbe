# Script to create translations
Write-Host "Creating translations..." -ForegroundColor Green

# Create translations directory
$translationsPath = "src/config/i18n/translations"
New-Item -ItemType Directory -Force -Path $translationsPath

# Function to create translation file
function Create-TranslationFile {
    param (
        [string]$code,
        [string]$content
    )
    $filePath = "$translationsPath/$code.json"
    $content | Set-Content -Path $filePath -Encoding UTF8
    Write-Host "Created translation file: $code.json" -ForegroundColor Yellow
}

# Create index.ts for translations
@"
import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import sw from './sw.json';
import ha from './ha.json';
import eto from './eto.json';
import bas from './bas.json';
import dua from './dua.json';
import ewo from './ewo.json';
import bafang from './bafang.json';
import bagangte from './bagangte.json';
import bamoun from './bamoun.json';
import yo from './yo.json';
import zu from './zu.json';

export const translations = {
  en,
  fr,
  es,
  sw,
  ha,
  eto,
  bas,
  dua,
  ewo,
  bafang,
  bagangte,
  bamoun,
  yo,
  zu,
} as const;

export type Language = keyof typeof translations;
"@ | Set-Content "$translationsPath/index.ts"

# Create each translation file
$translations = @{
    "en" = Get-Content "src/config/i18n/translations/en.json" -Raw
    "fr" = Get-Content "src/config/i18n/translations/fr.json" -Raw
    "es" = Get-Content "src/config/i18n/translations/es.json" -Raw
    "sw" = Get-Content "src/config/i18n/translations/sw.json" -Raw
    "ha" = Get-Content "src/config/i18n/translations/ha.json" -Raw
    "eto" = Get-Content "src/config/i18n/translations/eto.json" -Raw
    "bas" = Get-Content "src/config/i18n/translations/bas.json" -Raw
    "dua" = Get-Content "src/config/i18n/translations/dua.json" -Raw
    "ewo" = Get-Content "src/config/i18n/translations/ewo.json" -Raw
    "bafang" = Get-Content "src/config/i18n/translations/bafang.json" -Raw
    "bagangte" = Get-Content "src/config/i18n/translations/bagangte.json" -Raw
    "bamoun" = Get-Content "src/config/i18n/translations/bamoun.json" -Raw
    "yo" = Get-Content "src/config/i18n/translations/yo.json" -Raw
    "zu" = Get-Content "src/config/i18n/translations/zu.json" -Raw
}

foreach ($lang in $translations.Keys) {
    Create-TranslationFile -code $lang -content $translations[$lang]
}

Write-Host "Translations created successfully!" -ForegroundColor Green