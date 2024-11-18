import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeliveryOptions } from '../../components/delivery/DeliveryOptions';
import { useEnvironmentalStore } from '../../store/environmentalStore';

vi.mock('../../store/environmentalStore');

describe('Environmental Features', () => {
  it('adapts to weather conditions', () => {
    const mockUpdateRoute = vi.fn();
    vi.mocked(useEnvironmentalStore).mockReturnValue({
      updateRouteForWeather: mockUpdateRoute,
      currentWeather: {
        condition: 'rain',
        severity: 'moderate'
      }
    });

    render(<DeliveryOptions />);
    
    expect(mockUpdateRoute).toHaveBeenCalledWith(expect.objectContaining({
      weatherCondition: 'rain'
    }));
  });

  it('supports eco-friendly options', () => {
    const mockSelectOption = vi.fn();
    vi.mocked(useEnvironmentalStore).mockReturnValue({
      selectEcoOption: mockSelectOption,
      ecoOptions: [
        { id: 'bike', name: 'Bicycle', co2Reduction: '100%' }
      ]
    });

    render(<DeliveryOptions />);
    
    fireEvent.click(screen.getByText('Bicycle'));
    
    expect(mockSelectOption).toHaveBeenCalledWith('bike');
  });
});