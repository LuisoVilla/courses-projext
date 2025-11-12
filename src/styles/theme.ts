import { DefaultTheme } from 'styled-components';

const commonTheme = {
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',
    secondary: '#ec4899',
    secondaryDark: '#db2777',
    background: '#0f172a',
    backgroundLight: '#1e293b',
    surface: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    white: '#ffffff',
    border: '#475569',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(99, 102, 241, 0.5)',
  },
  ...commonTheme,
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#4f46e5',
    primaryDark: '#4338ca',
    primaryLight: '#6366f1',
    secondary: '#db2777',
    secondaryDark: '#be185d',
    background: '#f8fafc',
    backgroundLight: '#ffffff',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    white: '#ffffff',
    border: '#e2e8f0',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(79, 70, 229, 0.3)',
  },
  ...commonTheme,
};

// Legacy export for backwards compatibility
export const theme = darkTheme;
