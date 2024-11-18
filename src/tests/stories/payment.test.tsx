import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaymentProcessor } from '../../components/payment/PaymentProcessor';
import { usePaymentStore } from '../../store/useStore';

vi.mock('../../store/useStore');

describe('Payment User Stories', () => {
  // Story: "As a User, I want to submit payment securely"
  describe('Secure Payment Submission', () => {
    it('processes payment with encryption', async () => {
      const mockProcessPayment = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(usePaymentStore).mockReturnValue({
        processPayment: mockProcessPayment,
        loading: false,
        error: null
      });

      render(<PaymentProcessor amount={5000} deliveryId="d1" />);

      // Enter payment details
      fireEvent.change(screen.getByPlaceholderText('payment.cardNumber'), {
        target: { value: '4242424242424242' }
      });
      fireEvent.change(screen.getByPlaceholderText('payment.expiryDate'), {
        target: { value: '12/25' }
      });
      fireEvent.change(screen.getByPlaceholderText('payment.cvv'), {
        target: { value: '123' }
      });

      // Submit payment
      fireEvent.click(screen.getByText('payment.submit'));

      expect(mockProcessPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 5000,
          deliveryId: 'd1',
          // Verify encrypted data is sent
          encryptedData: expect.any(String)
        })
      );
    });
  });

  // Story: "As a Bidder, I want to receive payment after completing a delivery"
  describe('Bidder Payment Receipt', () => {
    it('releases payment to bidder after delivery confirmation', async () => {
      const mockReleasePayment = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(usePaymentStore).mockReturnValue({
        releasePayment: mockReleasePayment,
        loading: false,
        error: null
      });

      render(<DeliveryCompletion deliveryId="d1" />);

      // Confirm delivery completion
      fireEvent.click(screen.getByText('delivery.confirmCompletion'));

      await waitFor(() => {
        expect(mockReleasePayment).toHaveBeenCalledWith('d1');
        expect(screen.getByText('payment.released')).toBeInTheDocument();
      });
    });
  });

  // Story: "As a User, I want to initiate a dispute if there is an issue"
  describe('Payment Disputes', () => {
    it('allows users to open payment disputes', async () => {
      const mockOpenDispute = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(usePaymentStore).mockReturnValue({
        openDispute: mockOpenDispute,
        loading: false,
        error: null
      });

      render(<PaymentDispute deliveryId="d1" />);

      // Fill dispute form
      fireEvent.change(screen.getByLabelText('dispute.reason'), {
        target: { value: 'Package damaged during delivery' }
      });
      fireEvent.change(screen.getByLabelText('dispute.description'), {
        target: { value: 'The package arrived with visible damage' }
      });

      // Submit dispute
      fireEvent.click(screen.getByText('dispute.submit'));

      expect(mockOpenDispute).toHaveBeenCalledWith({
        deliveryId: 'd1',
        reason: 'Package damaged during delivery',
        description: 'The package arrived with visible damage'
      });
    });
  });
});