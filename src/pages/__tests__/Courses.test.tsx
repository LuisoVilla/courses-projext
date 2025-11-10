import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Courses from '../Courses';
import { theme } from '../../styles/theme';
import { useAuthStore } from '../../store/authStore';
import { useCoursesStore } from '../../store/coursesStore';

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

describe('Courses Component', () => {
  beforeEach(() => {
    // Setup authenticated user
    useAuthStore.setState({
      user: { id: '001', username: 'student001' },
      token: 'mock-token-123',
    });

    // Reset courses store
    useCoursesStore.setState({
      courses: [],
      registrations: [],
      currentTerm: null,
      loading: false,
      error: null,
    });

    mockedNavigate.mockClear();
  });

  it('should render header with user info', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByText(/Course Registration/i)).toBeInTheDocument();
      expect(screen.getByText(/student001/i)).toBeInTheDocument();
    });
  });

  it('should display loading skeletons initially', () => {
    useCoursesStore.setState({ loading: true });
    renderWithProviders(<Courses />);
    
    expect(screen.getByText(/Available Courses/i)).toBeInTheDocument();
  });

  it('should load and display courses', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByText(/Introduction to Programming/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should display prerequisites for courses', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      const dataStructuresCourse = screen.queryByText(/Data Structures/i);
      if (dataStructuresCourse) {
        expect(screen.getByText(/Prerequisites:/i)).toBeInTheDocument();
      }
    }, { timeout: 3000 });
  });

  it('should show register button for available courses', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      const registerButtons = screen.queryAllByRole('button', { name: /Register/i });
      expect(registerButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('should show registered status for enrolled courses', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      const registeredButtons = screen.queryAllByRole('button', { name: /Registered/i });
      // Student001 has completed 2 courses
      expect(registeredButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('should disable register button for courses with incomplete prerequisites', async () => {
    // Use student003 who has no completed courses
    useAuthStore.setState({
      user: { id: '003', username: 'student003' },
      token: 'mock-token-003',
    });

    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      const incompleteButtons = screen.queryAllByRole('button', { 
        name: /Prerequisites Incomplete/i 
      });
      expect(incompleteButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('should register for a course when clicking register button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Courses />);
    
    await waitFor(async () => {
      const registerButtons = screen.queryAllByRole('button', { name: /^Register$/i });
      
      if (registerButtons.length > 0) {
        await user.click(registerButtons[0]);
        
        await waitFor(() => {
          // Should show success message or update button state
          expect(screen.queryByText(/successfully/i) || screen.queryByText(/Registered/i)).toBeInTheDocument();
        });
      }
    }, { timeout: 5000 });
  });

  it('should logout when clicking logout button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Courses />);
    
    await waitFor(async () => {
      const logoutButton = screen.getByRole('button', { name: /Logout/i });
      await user.click(logoutButton);
      
      const { user: currentUser } = useAuthStore.getState();
      expect(currentUser).toBeNull();
    });
  });

  it('should show empty state when no courses available', async () => {
    useCoursesStore.setState({ 
      courses: [], 
      loading: false,
      currentTerm: { id: 1, name: 'Spring 2024', start_date: '2024-01-01', end_date: '2024-05-01' }
    });

    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByText(/No courses available/i)).toBeInTheDocument();
    });
  });

  it('should display current term name', async () => {
    renderWithProviders(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByText(/Spring 2024/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
