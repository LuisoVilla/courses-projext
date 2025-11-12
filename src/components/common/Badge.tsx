import styled from 'styled-components';

interface BadgeProps {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-block;
  padding: ${({ theme, size = 'md' }) => 
    size === 'sm' 
      ? `${theme.spacing.xs} ${theme.spacing.sm}` 
      : `${theme.spacing.sm} ${theme.spacing.md}`
  };
  
  background: ${({ theme, variant = 'default' }) => {
    if (variant === 'success') return `${theme.colors.success}22`;
    if (variant === 'error') return `${theme.colors.error}22`;
    if (variant === 'warning') return `${theme.colors.warning}22`;
    if (variant === 'info') return `${theme.colors.primary}22`;
    return theme.colors.surface;
  }};
  
  color: ${({ theme, variant = 'default' }) => {
    if (variant === 'success') return theme.colors.success;
    if (variant === 'error') return theme.colors.error;
    if (variant === 'warning') return theme.colors.warning;
    if (variant === 'info') return theme.colors.primary;
    return theme.colors.text;
  }};
  
  border: 1px solid ${({ theme, variant = 'default' }) => {
    if (variant === 'success') return theme.colors.success;
    if (variant === 'error') return theme.colors.error;
    if (variant === 'warning') return theme.colors.warning;
    if (variant === 'info') return theme.colors.primary;
    return theme.colors.border;
  }};
  
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ size = 'md' }) => size === 'sm' ? '0.75rem' : '0.875rem'};
  font-weight: 600;
  white-space: nowrap;
`;
