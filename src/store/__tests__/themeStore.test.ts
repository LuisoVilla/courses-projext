import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '../themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store to initial state
    useThemeStore.setState({ mode: 'dark' });
  });

  it('should initialize with dark mode', () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.mode).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    const { result } = renderHook(() => useThemeStore());

    // First toggle to light
    act(() => {
      result.current.toggleTheme();
    });

    // Then toggle back to dark
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('dark');
  });

  it('should set theme to light', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.mode).toBe('light');
  });

  it('should set theme to dark', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.mode).toBe('dark');
  });

  it('should persist theme preference in localStorage', () => {
    const { result } = renderHook(() => useThemeStore());

    act(() => {
      result.current.setTheme('light');
    });

    // Check if it's saved in localStorage
    const stored = localStorage.getItem('theme-storage');
    expect(stored).toBeTruthy();
    expect(stored).toContain('light');
  });
});
