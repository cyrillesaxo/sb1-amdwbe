import { describe, it, expect, vi } from 'vitest';
import { act } from '@testing-library/react';
import useStore from '../../store/useStore';
import { api } from '../../api';

// Mock the API
vi.mock('../../api');

describe('Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      useStore.setState({
        user: null,
        loading: false,
        error: null,
        deliveries: [],
      });
    });
  });

  it('initializes with default values', () => {
    const state = useStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.deliveries).toEqual([]);
  });

  it('handles login success', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    vi.mocked(api.login).mockResolvedValue(mockUser);

    await act(async () => {
      await useStore.getState().login('test@example.com', 'password');
    });

    const state = useStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('handles login failure', async () => {
    const error = new Error('Invalid credentials');
    vi.mocked(api.login).mockRejectedValue(error);

    await act(async () => {
      await useStore.getState().login('test@example.com', 'wrong-password');
    });

    const state = useStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('handles logout', () => {
    act(() => {
      useStore.setState({ user: { id: '1', name: 'Test User' } });
      useStore.getState().logout();
    });

    const state = useStore.getState();
    expect(state.user).toBeNull();
  });

  it('adds delivery request', async () => {
    const mockDelivery = {
      id: '1',
      pickup: { address: 'Test Pickup', lat: 0, lng: 0 },
      dropoff: { address: 'Test Dropoff', lat: 0, lng: 0 },
      status: 'pending'
    };

    vi.mocked(api.createDelivery).mockResolvedValue(mockDelivery);

    await act(async () => {
      await useStore.getState().addDeliveryRequest(mockDelivery);
    });

    const state = useStore.getState();
    expect(state.deliveries).toContainEqual(mockDelivery);
  });
});