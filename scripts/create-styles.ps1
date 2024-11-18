# Script to create styles and icons
Write-Host "Creating styles and icons..." -ForegroundColor Green

# Create styles directory
New-Item -ItemType Directory -Force -Path "src/styles"

# Create base styles file
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
body {
  margin: 0;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

#root {
  min-height: 100vh;
}

/* Animation classes */
.animate-spin-slow {
  animation: spin 2s linear infinite;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* Map styles */
.map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
}

.gm-style {
  height: 100% !important;
}

/* Form styles */
.form-input-focus {
  @apply focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-select-focus {
  @apply focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

/* Button styles */
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

/* Card styles */
.card {
  @apply bg-white rounded-lg shadow-lg p-6;
}

.card-hover {
  @apply hover:shadow-xl transition-shadow;
}

/* Icon styles */
.icon-spin {
  animation: spin 1s linear infinite;
}

.icon-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Loading animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
"@ | Set-Content "src/styles/index.css"

# Create icons directory
New-Item -ItemType Directory -Force -Path "src/styles/icons"

# Create icon styles
@"
/* Vehicle icons */
.icon-bike {
  @apply text-green-500;
}

.icon-motorcycle {
  @apply text-blue-500;
}

.icon-car {
  @apply text-indigo-500;
}

.icon-van {
  @apply text-purple-500;
}

.icon-truck {
  @apply text-red-500;
}

/* Status icons */
.icon-pending {
  @apply text-yellow-500;
}

.icon-in-progress {
  @apply text-blue-500;
}

.icon-completed {
  @apply text-green-500;
}

.icon-cancelled {
  @apply text-red-500;
}

/* Payment icons */
.icon-mobile-money {
  @apply text-orange-500;
}

.icon-credit-card {
  @apply text-indigo-500;
}

.icon-bank {
  @apply text-blue-500;
}

/* Navigation icons */
.icon-nav {
  @apply h-5 w-5 transition-colors;
}

.icon-nav-active {
  @apply text-blue-600;
}

.icon-nav-inactive {
  @apply text-gray-400 group-hover:text-gray-500;
}

/* Action icons */
.icon-action {
  @apply h-4 w-4 transition-colors;
}

.icon-action-primary {
  @apply text-blue-600 hover:text-blue-700;
}

.icon-action-danger {
  @apply text-red-600 hover:text-red-700;
}

/* Notification icons */
.icon-notification {
  @apply h-5 w-5;
}

.icon-notification-info {
  @apply text-blue-500;
}

.icon-notification-success {
  @apply text-green-500;
}

.icon-notification-warning {
  @apply text-yellow-500;
}

.icon-notification-error {
  @apply text-red-500;
}
"@ | Set-Content "src/styles/icons/index.css"

Write-Host "Styles and icons created successfully!" -ForegroundColor Green