# Start development services
Write-Host "Starting development services..." -ForegroundColor Green

# Start JSON Server with demo data
Start-Process -FilePath "npm" -ArgumentList "run server" -NoNewWindow

# Start WebSocket Server
Start-Process -FilePath "node" -ArgumentList "src/server/websocket.js" -NoNewWindow

# Start Vite development server
Start-Process -FilePath "npm" -ArgumentList "run dev" -NoNewWindow

Write-Host "All services started successfully!" -ForegroundColor Green
Write-Host "JSON Server running on http://localhost:3000" -ForegroundColor Yellow
Write-Host "WebSocket Server running on ws://localhost:3001" -ForegroundColor Yellow
Write-Host "Vite dev server running on http://localhost:5173" -ForegroundColor Yellow