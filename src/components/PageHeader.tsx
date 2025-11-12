import styled from 'styled-components';
import { Button } from './common';

interface PageHeaderProps {
  user?: {
    username: string;
    id: string;
  };
  term?: string;
  onLogout?: () => void;
  showLogo?: boolean;
}

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.colors.backgroundLight}ee;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
  font-weight: bold;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const UserTerm = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export function PageHeader({ user, term, onLogout, showLogo = true }: PageHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        {showLogo && (
          <LogoSection>
            📚 <span>Course Registration</span>
          </LogoSection>
        )}
        
        {user && (
          <UserSection>
            <UserDetails>
              <UserName>{user.username}</UserName>
              {term && <UserTerm>{term}</UserTerm>}
            </UserDetails>
            
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            )}
          </UserSection>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
}
