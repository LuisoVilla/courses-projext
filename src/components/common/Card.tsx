import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface CardProps {
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme, padding = 'lg' }) => {
    if (padding === 'sm') return theme.spacing.sm;
    if (padding === 'md') return theme.spacing.md;
    if (padding === 'lg') return theme.spacing.lg;
    return theme.spacing.xl;
  }};
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${({ animate }) => (animate ? fadeIn : 'none')} 0.5s ease-out;
  
  ${({ hover }) => hover && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;
