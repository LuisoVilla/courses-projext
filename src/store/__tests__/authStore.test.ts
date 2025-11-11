import { useAuthStore } from '../authStore';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    getCurrentTerm: jest.fn(),
    getCourses: jest.fn(),
    getStudentRegistrations: jest.fn(),
    registerForCourse: jest.fn(),
    checkPrerequisites: jest.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store state
    useAuthStore.setState({ user: null, token: null });
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default successful login mock
    (api.login as jest.Mock).mockResolvedValue({
      data: {
        student: { id: '001', username: 'student001' },
        token: 'mock-token-001',
      },
    });
  });

  describe('Initial State', () => {
    it('should have null user and token initially', () => {
      const { user, token } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
    });

    it('should have isAuthenticated as false initially', () => {
      const { isAuthenticated } = useAuthStore.getState();
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('Login', () => {
    it('should set user and token on successful login', async () => {
      const { login } = useAuthStore.getState();
      const result = await login('student001', 'pass123');
      
      console.log('Login result:', result);

      const { user, token, error } = useAuthStore.getState();
      console.log('State after login:', { user, token, error });
      
      expect(user).toBeDefined();
      expect(user?.username).toBe('student001');
      expect(token).toBeDefined();
    });

    it('should persist user and token in localStorage', async () => {
      const { login } = useAuthStore.getState();
      await login('student001', 'pass123');

      const storedState = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      expect(storedState.state.user).toBeDefined();
      expect(storedState.state.token).toBeDefined();
    });

    it('should set isAuthenticated to true after login', async () => {
      const { login, isAuthenticated } = useAuthStore.getState();
      await login('student001', 'pass123');

      expect(isAuthenticated()).toBe(true);
    });

    it('should throw error on invalid credentials', async () => {
      // Override the mock for this test to reject
      (api.login as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
      
      const { login } = useAuthStore.getState();
      const result = await login('invalid', 'wrong');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      
      const { user, token } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
    });
  });

  describe('Logout', () => {
    it('should clear user and token on logout', async () => {
      const { login, logout } = useAuthStore.getState();
      
      // First login
      await login('student001', 'pass123');
      
      // Then logout
      logout();

      const { user, token } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
    });

    it('should clear localStorage on logout', async () => {
      const { login, logout } = useAuthStore.getState();
      
      await login('student001', 'pass123');
      logout();

      const storedState = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      expect(storedState.state.user).toBeNull();
      expect(storedState.state.token).toBeNull();
    });

    it('should set isAuthenticated to false after logout', async () => {
      const { login, logout, isAuthenticated } = useAuthStore.getState();
      
      await login('student001', 'pass123');
      logout();

      expect(isAuthenticated()).toBe(false);
    });
  });
});
