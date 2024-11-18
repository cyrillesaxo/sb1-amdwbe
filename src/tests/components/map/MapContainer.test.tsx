import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapContainer } from '../../../components/map/MapContainer';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';

// Mock the Google Maps hook
vi.mock('../../../hooks/useGoogleMaps');

describe('MapContainer', () => {
  it('shows loading state when map is loading', () => {
    vi.mocked(useGoogleMaps).mockReturnValue({
      isLoaded: false,
      loadError: null,
      google: null,
    });

    render(<MapContainer />);
    expect(screen.getByText('Loading map...')).toBeInTheDocument();
  });

  it('shows error state when map fails to load', () => {
    vi.mocked(useGoogleMaps).mockReturnValue({
      isLoaded: false,
      loadError: new Error('Failed to load map'),
      google: null,
    });

    render(<MapContainer />);
    expect(screen.getByText('Failed to load map')).toBeInTheDocument();
  });

  it('renders map when loaded successfully', () => {
    const mockMap = {
      setOptions: vi.fn(),
    };
    const mockGoogle = {
      maps: {
        Map: vi.fn(() => mockMap),
      },
    };

    vi.mocked(useGoogleMaps).mockReturnValue({
      isLoaded: true,
      loadError: null,
      google: mockGoogle as any,
    });

    render(<MapContainer />);
    expect(mockGoogle.maps.Map).toHaveBeenCalled();
  });
});