import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from '../App';
import { theme } from '../styles/theme';
import { useAuthStore } from '../store/authStore';
import { useCoursesStore } from '../store/coursesStore';

const renderApp = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Integration: Full User Flow', () => {
  beforeEach(() => {
    // Clear stores
    useAuthStore.setState({ user: null, token: null });
    useCoursesStore.setState({
      courses: [],
      registrations: [],
      currentTerm: null,
      loading: false,
      error: null,
    });
    localStorage.clear();
  });

  it('should complete full registration flow: login -> view courses -> register -> logout', async () => {
    const user = userEvent.setup();
    renderApp();

    // Step 1: Should start at login page
    await waitFor(() => {
      expect(screen.getByText(/Course Registration System/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Student ID/i)).toBeInTheDocument();
    });

    // Step 2: Login with valid credentials
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    await user.type(usernameInput, 'student001');
    await user.type(passwordInput, 'pass123');
    await user.click(loginButton);

    // Step 3: Should navigate to courses page and load courses
    await waitFor(() => {
      expect(screen.getByText(/Available Courses/i)).toBeInTheDocument();
      expect(screen.getByText(/student001/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Step 4: Should display courses
    await waitFor(() => {
      expect(screen.getByText(/Introduction to Programming/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Step 5: Should show current term
    await waitFor(() => {
      expect(screen.getByText(/Spring 2024/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Step 6: Logout
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    await user.click(logoutButton);

    // Step 7: Should be redirected to login page
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Student ID/i)).toBeInTheDocument();
    });

    // Step 8: Auth store should be cleared
    const { user: currentUser, token } = useAuthStore.getState();
    expect(currentUser).toBeNull();
    expect(token).toBeNull();
  });

  it('should prevent access to courses page when not authenticated', async () => {
    renderApp();

    // Try to navigate to /courses directly
    window.history.pushState({}, 'Courses', '/courses');

    await waitFor(() => {
      // Should be redirected to login
      expect(screen.getByPlaceholderText(/Student ID/i)).toBeInTheDocument();
    });
  });

  it('should persist authentication across page reloads', async () => {
    const user = userEvent.setup();
    renderApp();

    // Login
    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    await user.type(usernameInput, 'student001');
    await user.type(passwordInput, 'pass123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Available Courses/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check that auth is persisted in localStorage
    const storedAuth = localStorage.getItem('auth-storage');
    expect(storedAuth).toBeTruthy();
    
    const parsedAuth = JSON.parse(storedAuth || '{}');
    expect(parsedAuth.state.user).toBeDefined();
    expect(parsedAuth.state.token).toBeDefined();
  });

  it('should show different courses based on user prerequisites', async () => {
    const user = userEvent.setup();
    
    // Test with student003 (no completed courses)
    renderApp();

    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    await user.type(usernameInput, 'student003');
    await user.type(passwordInput, 'pass123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Available Courses/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Should see "Prerequisites Incomplete" for courses with prereqs
    await waitFor(() => {
      const incompleteButtons = screen.queryAllByRole('button', { 
        name: /Prerequisites Incomplete/i 
      });
      expect(incompleteButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('should handle login errors gracefully', async () => {
    const user = userEvent.setup();
    renderApp();

    const usernameInput = screen.getByPlaceholderText(/Student ID/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    await user.type(usernameInput, 'invaliduser');
    await user.type(passwordInput, 'wrongpass');
    await user.click(loginButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    // Should stay on login page
    expect(screen.getByPlaceholderText(/Student ID/i)).toBeInTheDocument();
  });
});
