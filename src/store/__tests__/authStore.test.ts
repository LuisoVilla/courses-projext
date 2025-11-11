import { useAuthStore } from '../authStore';

// Mock the API
jest.mock('../../services/api');

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store state
    useAuthStore.setState({ user: null, token: null });
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
      const mockUser = { id: '001', username: 'student001' };
      const mockToken = 'mock-token-123';

      const { login } = useAuthStore.getState();
      await login('student001', 'pass123');

      const { user, token } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(token).toBe(mockToken);
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
      const { login } = useAuthStore.getState();

      await expect(login('invalid', 'wrong')).rejects.toThrow();
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
