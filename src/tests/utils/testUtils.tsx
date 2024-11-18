import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { DeliveryProvider } from '../../contexts/DeliveryContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { GoogleMapsProvider } from '../../components/maps/GoogleMapsProvider';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <DeliveryProvider>
              <ErrorBoundary>
                <GoogleMapsProvider>
                  {ui}
                </GoogleMapsProvider>
              </ErrorBoundary>
            </DeliveryProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}