import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeliveryRequestForm } from '../../components/delivery/DeliveryRequestForm';
import { useDeliveryStore } from '../../store/useStore';
import { useI18nStore } from '../../store/i18nStore';

vi.mock('../../store/useStore');
vi.mock('../../store/i18nStore');

describe('Delivery User Stories', () => {
  beforeEach(() => {
    vi.mocked(useI18nStore).mockReturnValue({
      t: (key: string) => key,
      language: 'en',
      setLanguage: vi.fn(),
    });

    vi.mocked(useDeliveryStore).mockReturnValue({
      deliveries: [],
      loading: false,
      error: null,
      addDeliveryRequest: vi.fn(),
      updateDeliveryStatus: vi.fn(),
    });
  });

  // Story: "As a User, I want to create a delivery request"
  describe('Create Delivery Request', () => {
    it('allows user to create a delivery request with all details', async () => {
      const { addDeliveryRequest } = useDeliveryStore();
      render(<DeliveryRequestForm />);

      // Fill delivery form
      fireEvent.change(screen.getByPlaceholderText('delivery.pickupLocation'), {
        target: { value: 'Douala Central Market' }
      });
      fireEvent.change(screen.getByPlaceholderText('delivery.dropoffLocation'), {
        target: { value: 'Bonapriso Mall' }
      });
      fireEvent.change(screen.getByPlaceholderText('delivery.weight'), {
        target: { value: '5' }
      });
      fireEvent.change(screen.getByPlaceholderText('delivery.description'), {
        target: { value: 'Fragile electronics' }
      });

      // Select vehicle type
      fireEvent.click(screen.getByText('delivery.vehicleTypes.car'));

      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: 'delivery.createRequest' }));

      expect(addDeliveryRequest).toHaveBeenCalledWith(expect.objectContaining({
        pickup: 'Douala Central Market',
        dropoff: 'Bonapriso Mall',
        weight: 5,
        description: 'Fragile electronics',
        vehicleType: 'car'
      }));
    });
  });

  // Story: "As a User, I want to track all my packages in real-time"
  describe('Package Tracking', () => {
    it('shows real-time location updates for active deliveries', async () => {
      const mockDelivery = {
        id: 'd1',
        status: 'in_progress',
        currentLocation: { lat: 4.0511, lng: 9.7679 }
      };

      vi.mocked(useDeliveryStore).mockReturnValue({
        ...useDeliveryStore(),
        deliveries: [mockDelivery],
      });

      render(<DeliveryTracking deliveryId="d1" />);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-marker')).toHaveAttribute(
          'data-location',
          '4.0511,9.7679'
        );
      });
    });
  });

  // Story: "As a User, I want to receive notifications about delivery progress"
  describe('Delivery Notifications', () => {
    it('shows notifications for delivery status changes', async () => {
      const mockNotification = vi.fn();
      window.Notification = mockNotification;

      render(<DeliveryTracking deliveryId="d1" />);

      // Simulate status change
      fireEvent(window, new CustomEvent('delivery-status-change', {
        detail: {
          id: 'd1',
          status: 'picked_up',
          message: 'Your package has been picked up'
        }
      }));

      expect(mockNotification).toHaveBeenCalledWith(
        'Delivery Update',
        expect.objectContaining({
          body: 'Your package has been picked up'
        })
      );
    });
  });

  // Story: "As a Bidder, I want to receive notifications of new delivery requests"
  describe('Bidder Notifications', () => {
    it('notifies bidders of new delivery requests', async () => {
      const mockNotification = vi.fn();
      window.Notification = mockNotification;

      render(<BidderDashboard />);

      // Simulate new delivery request
      fireEvent(window, new CustomEvent('new-delivery-request', {
        detail: {
          id: 'd1',
          pickup: 'Douala Central Market',
          dropoff: 'Bonapriso Mall'
        }
      }));

      expect(mockNotification).toHaveBeenCalledWith(
        'New Delivery Request',
        expect.objectContaining({
          body: expect.stringContaining('Douala Central Market')
        })
      );
    });
  });
});