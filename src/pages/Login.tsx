import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { SEO } from '../components/SEO';
import {
  Button,
  Input,
  Label,
  ErrorMessage as ErrorMsg,
  CenteredContainer,
  Logo
} from '../components/common';

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

const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-width: 420px;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  border: none;
  
  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter your student ID');
      return;
    }

    setLoading(true);

    const result = await login(username, password);
    
    setLoading(false);

    if (result.success) {
      navigate('/courses');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <CenteredContainer>
      <SEO 
        title="Student Login"
        description="Sign in to access course registration system. View available courses and register for next semester."
        keywords="student login, course registration login, university portal"
        url="https://courses-projext.vercel.app/login"
      />
      <LoginCard>
        <Logo size="md" animated>📚</Logo>
        <Title>Course Registration</Title>
        <Subtitle>Sign in with your student ID</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Student ID</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your student ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              hasError={!!error}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              hasError={!!error}
            />
          </InputGroup>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <SubmitButton type="submit" disabled={loading} fullWidth>
            {loading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>
      </LoginCard>
    </CenteredContainer>
  );
}

export default Login;
