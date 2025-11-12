import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ theme, size = 'md' }) => {
    if (size === 'sm') return `${theme.spacing.sm} ${theme.spacing.md}`;
    if (size === 'lg') return `${theme.spacing.md} ${theme.spacing.xl}`;
    return `${theme.spacing.sm} ${theme.spacing.lg}`;
  }};
  
  background: ${({ theme, variant = 'primary' }) => {
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary;
    if (variant === 'danger') return theme.colors.error;
    return 'transparent';
  }};
  
  color: ${({ theme, variant = 'primary' }) => 
    variant === 'ghost' ? theme.colors.text : theme.colors.white
  };
  
  border: 1px solid ${({ theme, variant = 'primary' }) => {
    if (variant === 'ghost') return theme.colors.border;
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary;
    if (variant === 'danger') return theme.colors.error;
    return theme.colors.border;
  }};
  
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: ${({ size = 'md' }) => {
    if (size === 'sm') return '0.875rem';
    if (size === 'lg') return '1.125rem';
    return '1rem';
  }};
  
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    opacity: 0.9;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;
