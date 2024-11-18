import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { GOOGLE_MAPS_API_KEY } from '../../config/constants';

describe('useGoogleMaps', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useGoogleMaps());
    
    expect(result.current.isLoaded).toBe(false);
    expect(result.current.loadError).toBeNull();
    expect(result.current.google).toBeNull();
  });

  it('handles missing API key', async () => {
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', '');
    
    const { result } = renderHook(() => useGoogleMaps());
    
    await waitFor(() => {
      expect(result.current.loadError).toBeTruthy();
      expect(result.current.loadError?.message).toContain('API key is missing');
    });
  });

  it('loads Google Maps successfully', async () => {
    const mockGoogle = {
      maps: {
        Map: vi.fn(),
        Marker: vi.fn(),
      },
    };

    // Mock the loader
    vi.mock('@googlemaps/js-api-loader', () => ({
      Loader: vi.fn().mockImplementation(() => ({
        load: () => Promise.resolve(mockGoogle),
      })),
    }));

    const { result } = renderHook(() => useGoogleMaps());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
      expect(result.current.google).toBe(mockGoogle);
      expect(result.current.loadError).toBeNull();
    });
  });

  it('handles load failure', async () => {
    const error = new Error('Failed to load Google Maps');

    // Mock the loader with error
    vi.mock('@googlemaps/js-api-loader', () => ({
      Loader: vi.fn().mockImplementation(() => ({
        load: () => Promise.reject(error),
      })),
    }));

    const { result } = renderHook(() => useGoogleMaps());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(false);
      expect(result.current.loadError).toBe(error);
      expect(result.current.google).toBeNull();
    });
  });
});