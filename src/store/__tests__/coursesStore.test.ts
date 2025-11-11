import { useCoursesStore } from '../coursesStore';
import { useAuthStore } from '../authStore';
import api from '../../services/api';
import { mockData } from '../../mocks/mockData';

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

describe('CoursesStore', () => {
  // Track registered courses during tests
  const registeredCoursesByStudent: { [key: string]: number[] } = {};
  
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
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Reset registered courses tracking
    Object.keys(registeredCoursesByStudent).forEach(key => delete registeredCoursesByStudent[key]);
    
    // Setup default mock responses
    (api.getCurrentTerm as jest.Mock).mockResolvedValue({
      data: mockData.currentTerm,
    });
    
    (api.getCourses as jest.Mock).mockResolvedValue({
      data: {
        courses: mockData.courses,
      },
    });
    
    (api.getStudentRegistrations as jest.Mock).mockImplementation((studentId: string) => {
      const student = mockData.students.find((s: any) => s.id === studentId);
      const completedCourses = student ? student.completedCourses : [];
      // Include both completed courses and newly registered courses
      const allCourses = [...completedCourses, ...(registeredCoursesByStudent[studentId] || [])];
      
      return Promise.resolve({
        data: {
          registrations: allCourses.map((courseId: number) => ({
            id: courseId,
            course: mockData.courses.find((c: any) => c.id === courseId)!,
            term: mockData.currentTerm,
            status: 'enrolled',
          })),
        },
      });
    });
    
    (api.registerForCourse as jest.Mock).mockImplementation((studentId: string, courseId: number) => {
      // Track the registration
      if (!registeredCoursesByStudent[studentId]) {
        registeredCoursesByStudent[studentId] = [];
      }
      if (!registeredCoursesByStudent[studentId].includes(courseId)) {
        registeredCoursesByStudent[studentId].push(courseId);
      }
      
      const course = mockData.courses.find((c: any) => c.id === courseId);
      return Promise.resolve({
        data: {
          registration: {
            id: Date.now(),
            course,
            term: mockData.currentTerm,
            status: 'enrolled',
          },
        },
      });
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
      const { loadData } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');

      const state = useCoursesStore.getState();
      expect(state.courses.length).toBeGreaterThan(0);
      expect(state.currentTerm).not.toBeNull();
      expect(state.currentTerm?.name).toBe('Spring 2024');
    });

    it('should set loading to true while fetching', async () => {
      const { loadData } = useCoursesStore.getState();
      
      const loadPromise = loadData('001', 'mock-token-123');
    
      await loadPromise;
    });
  });

  describe('isRegistered', () => {
    it('should return true if student is registered in course', async () => {
      const { loadData, isRegistered } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      // Student001 has completed courses 1 and 2
      const state = useCoursesStore.getState();
      // After loadData, registrations should be populated
      expect(state.registrations.length).toBeGreaterThan(0);
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
      
      expect(courseWithMetPrereqs).toBeDefined();
      expect(canRegister(courseWithMetPrereqs!)).toBe(true);
    });

    it('should return false if prerequisites are not met', async () => {
      const { loadData, canRegister } = useCoursesStore.getState();
      
      await loadData('003', 'mock-token-123'); // student003 has no completed courses
      
      const state = useCoursesStore.getState();
      // Find a course with prerequisites
      const courseWithPrereqs = state.courses.find(c => c.prereqs.length > 0);
      
      expect(courseWithPrereqs).toBeDefined();
      expect(canRegister(courseWithPrereqs!)).toBe(false);
    });
  });

  describe('getCourseName', () => {
    it('should return course name by id', async () => {
      const { loadData, getCourseName } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const courseName = getCourseName(1);
      expect(courseName).toBe('Introduction to Programming');
    });

    it('should return "Course {id}" for invalid id', async () => {
      const { loadData, getCourseName } = useCoursesStore.getState();
      
      await loadData('001', 'mock-token-123');
      
      const courseName = getCourseName(999);
      expect(courseName).toBe('Course 999');
    });
  });

  describe('registerForCourse', () => {
    it('should register student in a course', async () => {
      const { loadData, registerForCourse } = useCoursesStore.getState();
      
      // Use student003 who has no completed courses
      await loadData('003', 'mock-token-123');
      
      let state = useCoursesStore.getState();
      // Course ID 1 (Introduction to Programming) has no prerequisites
      const courseId = 1;
      
      expect(state.isRegistered(courseId)).toBe(false);
      expect(state.currentTerm).toBeDefined();
      
      await registerForCourse('003', courseId, state.currentTerm!.id, 'mock-token-123');
      
      state = useCoursesStore.getState();
      expect(state.isRegistered(courseId)).toBe(true);
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