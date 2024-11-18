import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeliveryOptions } from '../../components/delivery/DeliveryOptions';
import { useInfrastructureStore } from '../../store/infrastructureStore';

vi.mock('../../store/infrastructureStore');

describe('Infrastructure Adaptation Features', () => {
  it('supports alternative delivery methods', () => {
    const mockSelectMethod = vi.fn();
    vi.mocked(useInfrastructureStore).mockReturnValue({
      selectDeliveryMethod: mockSelectMethod,
      availableMethods: [
        { id: 'bike', name: 'Bicycle Courier' },
        { id: 'motorbike', name: 'Motorcycle' }
      ]
    });

    render(<DeliveryOptions />);
    
    fireEvent.click(screen.getByText('Bicycle Courier'));
    
    expect(mockSelectMethod).toHaveBeenCalledWith('bike');
  });

  it('manages pickup stations', () => {
    const mockSelectStation = vi.fn();
    vi.mocked(useInfrastructureStore).mockReturnValue({
      selectPickupStation: mockSelectStation,
      stations: [
        { id: '1', name: 'Market Station', capacity: 50 }
      ]
    });

    render(<DeliveryOptions />);
    
    fireEvent.click(screen.getByText('Market Station'));
    
    expect(mockSelectStation).toHaveBeenCalledWith('1');
  });
});