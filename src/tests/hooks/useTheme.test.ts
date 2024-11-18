import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '../../store/themeStore';

describe('useTheme', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useThemeStore.setState({
        theme: 'light',
        customColors: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          accent: '#8b5cf6',
          background: '#ffffff',
          text: '#1f2937',
        },
      });
    });
  });

  it('initializes with default theme', () => {
    const { result } = renderHook(() => useThemeStore());
    
    expect(result.current.theme).toBe('light');
  });

  it('changes theme', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
  });

  it('updates custom colors', () => {
    const { result } = renderHook(() => useThemeStore());
    const newColor = '#ff0000';
    
    act(() => {
      result.current.setCustomColor('primary', newColor);
    });
    
    expect(result.current.customColors.primary).toBe(newColor);
  });

  it('toggles between light and dark themes', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
  });
});