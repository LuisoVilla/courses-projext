import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const Logo = styled.div<LogoProps>`
  width: ${({ size = 'md' }) => {
    if (size === 'sm') return '50px';
    if (size === 'lg') return '100px';
    return '80px';
  }};
  height: ${({ size = 'md' }) => {
    if (size === 'sm') return '50px';
    if (size === 'lg') return '100px';
    return '80px';
  }};
  margin: ${({ size = 'md' }) => 
    size === 'sm' ? '0' : `0 auto ${size === 'lg' ? '2rem' : '1.5rem'}`
  };
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size = 'md' }) => {
    if (size === 'sm') return '1.5rem';
    if (size === 'lg') return '3rem';
    return '2.5rem';
  }};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  animation: ${({ animated }) => (animated ? float : 'none')} 3s ease-in-out infinite;
`;

export const LogoText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 1.5rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;
