import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProfile } from '../../components/profile/UserProfile';
import { useUser } from '../../store/useStore';

vi.mock('../../store/useStore');

describe('Profile User Stories', () => {
  // Story: "As a User, I want to customize my profile settings"
  describe('Profile Customization', () => {
    it('allows users to update their profile information', async () => {
      const mockUpdateProfile = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(useUser).mockReturnValue({
        updateProfile: mockUpdateProfile,
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      });

      render(<UserProfile />);

      // Edit profile
      fireEvent.click(screen.getByText('profile.edit'));
      
      // Update name
      fireEvent.change(screen.getByLabelText('profile.name'), {
        target: { value: 'John Smith' }
      });

      // Save changes
      fireEvent.click(screen.getByText('common.save'));

      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'John Smith'
      });
    });
  });

  // Story: "As a User, I want to manage my notification preferences"
  describe('Notification Preferences', () => {
    it('allows users to update notification settings', async () => {
      const mockUpdateNotifications = vi.fn().mockResolvedValue({ success: true });
      vi.mocked(useUser).mockReturnValue({
        updateNotificationPreferences: mockUpdateNotifications,
        notificationPreferences: {
          email: true,
          push: true,
          sms: false
        }
      });

      render(<NotificationSettings />);

      // Toggle SMS notifications
      fireEvent.click(screen.getByLabelText('notifications.sms'));

      expect(mockUpdateNotifications).toHaveBeenCalledWith({
        email: true,
        push: true,
        sms: true
      });
    });
  });

  // Story: "As a User, I want to view my delivery history"
  describe('Delivery History', () => {
    it('displays past deliveries with details', async () => {
      const mockDeliveries = [
        {
          id: 'd1',
          date: '2024-03-15',
          status: 'completed',
          pickup: 'Location A',
          dropoff: 'Location B'
        }
      ];

      vi.mocked(useUser).mockReturnValue({
        deliveryHistory: mockDeliveries
      });

      render(<DeliveryHistory />);

      expect(screen.getByText('Location A')).toBeInTheDocument();
      expect(screen.getByText('Location B')).toBeInTheDocument();
      expect(screen.getByText('2024-03-15')).toBeInTheDocument();
    });
  });
});