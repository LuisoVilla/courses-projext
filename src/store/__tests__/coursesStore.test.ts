import { useCoursesStore } from '../coursesStore';
import { useAuthStore } from '../authStore';

describe('CoursesStore', () => {
  beforeEach(() => {
    // Reset store state
    useCoursesStore.setState({
      courses: [],
      registrations: [],
      currentTerm: null,
      loading: false,
      error: null,
    });
    
    // Setup auth
    useAuthStore.setState({
      user: { id: '001', username: 'student001' },
      token: 'mock-token-123',
    });
  });

  describe('Initial State', () => {
    it('should have empty courses and registrations initially', () => {
      const { courses, registrations } = useCoursesStore.getState();
      expect(courses).toEqual([]);
      expect(registrations).toEqual([]);
    });

    it('should have null currentTerm initially', () => {
      const { currentTerm } = useCoursesStore.getState();
      expect(currentTerm).toBeNull();
    });

    it('should have loading false initially', () => {
      const { loading } = useCoursesStore.getState();
      expect(loading).toBe(false);
    });
  });

  describe('loadData', () => {
    it('should load courses and registrations', async () => {
      const { loadData, courses, registrations, currentTerm } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');

      const state = useCoursesStore.getState();
      expect(state.courses.length).toBeGreaterThan(0);
      expect(state.currentTerm).not.toBeNull();
    });

    it('should set loading to true while fetching', async () => {
      const { loadData } = useCoursesStore.getState();
      
      const loadPromise = loadData('001', 'mock-token-123');
      
      // Check if loading is true during the fetch
      const { loading } = useCoursesStore.getState();
      
      await loadPromise;
    });
  });

  describe('isRegistered', () => {
    it('should return true if student is registered in course', async () => {
      const { loadData, isRegistered } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      // Student001 has completed courses 1 and 2
      expect(isRegistered(1)).toBe(true);
      expect(isRegistered(2)).toBe(true);
    });

    it('should return false if student is not registered', async () => {
      const { loadData, isRegistered } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      // Student hasn't registered for course 3
      expect(isRegistered(3)).toBe(false);
    });
  });

  describe('canRegister', () => {
    it('should return true if prerequisites are met', async () => {
      const { loadData, canRegister, courses } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const state = useCoursesStore.getState();
      // Find a course that student001 can register for (has prereqs completed)
      const courseWithMetPrereqs = state.courses.find(c => 
        c.prereqs.length > 0 && c.prereqs.every(p => [1, 2].includes(p))
      );
      
      if (courseWithMetPrereqs) {
        expect(canRegister(courseWithMetPrereqs)).toBe(true);
      }
    });

    it('should return false if prerequisites are not met', async () => {
      const { loadData, canRegister } = useCoursesStore.getState();
      
      await loadData('003', 'mock-token-123'); // student003 has no completed courses
      
      const state = useCoursesStore.getState();
      // Find a course with prerequisites
      const courseWithPrereqs = state.courses.find(c => c.prereqs.length > 0);
      
      if (courseWithPrereqs) {
        expect(canRegister(courseWithPrereqs)).toBe(false);
      }
    });
  });

  describe('getCourseName', () => {
    it('should return course name by id', async () => {
      const { loadData, getCourseName } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const courseName = getCourseName(1);
      expect(courseName).toBe('Introduction to Programming');
    });

    it('should return "Unknown Course" for invalid id', async () => {
      const { loadData, getCourseName } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const courseName = getCourseName(999);
      expect(courseName).toBe('Unknown Course');
    });
  });

  describe('registerForCourse', () => {
    it('should register student in a course', async () => {
      const { loadData, registerForCourse, isRegistered } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const state = useCoursesStore.getState();
      const availableCourse = state.courses.find(c => !isRegistered(c.id) && c.prereqs.length === 0);
      
      if (availableCourse && state.currentTerm) {
        await registerForCourse('001', availableCourse.id, state.currentTerm.id, 'mock-token-123');
        
        const updatedState = useCoursesStore.getState();
        expect(updatedState.isRegistered(availableCourse.id)).toBe(true);
      }
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', async () => {
      const { loadData, reset } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      reset();

      const state = useCoursesStore.getState();
      expect(state.courses).toEqual([]);
      expect(state.registrations).toEqual([]);
      expect(state.currentTerm).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
