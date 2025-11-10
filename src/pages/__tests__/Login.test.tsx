import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from '../Login';
import { theme } from '../../styles/theme';
import { useAuthStore } from '../../store/authStore';

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null });
    mockedNavigate.mockClear();
  });

  it('should render login form', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/Course Registration System/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Student ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('should display demo credentials', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/Demo Credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/student001/i)).toBeInTheDocument();
    expect(screen.getByText(/pass123/i)).toBeInTheDocument();
  });

  it('should show error when username is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const loginButton = screen.getByRole('button', { name: /Login/i });
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter your student ID/i)).toBeInTheDocument();
    });
  });

  it('should show error when password is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    
    await user.type(usernameInput, 'student001');
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter your password/i)).toBeInTheDocument();
    });
  });

  it('should login successfully with valid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    
    await user.type(usernameInput, 'student001');
    await user.type(passwordInput, 'pass123');
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/courses');
    });
  });

  it('should show error with invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    
    await user.type(usernameInput, 'invalid');
    await user.type(passwordInput, 'wrong');
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should disable login button while loading', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    
    await user.type(usernameInput, 'student001');
    await user.type(passwordInput, 'pass123');
    await user.click(loginButton);
    
    // Button should be disabled during login
    expect(loginButton).toBeDisabled();
  });
});
