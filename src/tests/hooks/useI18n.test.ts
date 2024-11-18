import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useI18nStore } from '../../store/i18nStore';

describe('useI18n', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useI18nStore.setState({
        language: 'en',
      });
    });
  });

  it('initializes with default language', () => {
    const { result } = renderHook(() => useI18nStore());
    
    expect(result.current.language).toBe('en');
  });

  it('changes language', () => {
    const { result } = renderHook(() => useI18nStore());
    
    act(() => {
      result.current.setLanguage('fr');
    });
    
    expect(result.current.language).toBe('fr');
  });

  it('translates keys correctly', () => {
    const { result } = renderHook(() => useI18nStore());
    
    expect(result.current.t('common.loading')).toBe('Loading...');
    
    act(() => {
      result.current.setLanguage('fr');
    });
    
    expect(result.current.t('common.loading')).toBe('Chargement...');
  });

  it('handles missing translations', () => {
    const { result } = renderHook(() => useI18nStore());
    const missingKey = 'missing.key';
    
    expect(result.current.t(missingKey)).toBe(missingKey);
  });

  it('interpolates translation parameters', () => {
    const { result } = renderHook(() => useI18nStore());
    const key = 'welcome';
    const params = { name: 'John' };
    
    expect(result.current.t(key, params)).toContain(params.name);
  });
});