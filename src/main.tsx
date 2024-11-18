import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { serviceWorkerService } from './services/ServiceWorkerService';
import { webSocketService } from './services/WebSocketService';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Initialize service worker
serviceWorkerService.register().catch(console.error);

// Initialize WebSocket when user is authenticated
document.addEventListener('userAuthenticated', (event: CustomEvent<{ userId: string }>) => {
  if (event.detail?.userId) {
    webSocketService.connect(event.detail.userId);
  }
});

root.render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);