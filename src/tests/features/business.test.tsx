import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BusinessDashboard } from '../../components/business/BusinessDashboard';
import { useBusinessStore } from '../../store/businessStore';

vi.mock('../../store/businessStore');

describe('Business Model Features', () => {
  it('supports micro-enterprise onboarding', async () => {
    const mockOnboard = vi.fn().mockResolvedValue({ success: true });
    vi.mocked(useBusinessStore).mockReturnValue({
      onboardBusiness: mockOnboard,
      businessType: 'micro'
    });

    render(<BusinessDashboard />);
    
    fireEvent.click(screen.getByText('business.startOnboarding'));
    
    expect(mockOnboard).toHaveBeenCalled();
  });

  it('manages community pickup points', () => {
    const mockAddPickupPoint = vi.fn();
    vi.mocked(useBusinessStore).mockReturnValue({
      addPickupPoint: mockAddPickupPoint,
      pickupPoints: []
    });

    render(<BusinessDashboard />);
    
    fireEvent.click(screen.getByText('business.addPickupPoint'));
    fireEvent.change(screen.getByLabelText('business.pickupPoint.name'), {
      target: { value: 'Local Shop' }
    });
    
    expect(mockAddPickupPoint).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Local Shop'
    }));
  });
});