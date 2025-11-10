// Student types
export interface Student {
  id: string;
  username: string;
  password: string;
  completedCourses: number[];
}

// Course types
export interface Course {
  id: number;
  name: string;
  prereqs: number[];
}

// Term types
export interface Term {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

// Registration types
export interface Registration {
  id: number;
  course: Course;
  term: Term;
  status: 'enrolled' | 'pending' | 'completed' | 'failed';
}

// API Response types
export interface LoginResponse {
  student: {
    id: string;
    username: string;
  };
  token: string;
}

export interface CoursesResponse {
  courses: Course[];
}

export interface RegistrationsResponse {
  registrations: Registration[];
}

export interface RegistrationResponse {
  registration: Registration;
}

// Store types
export interface AuthState {
  user: { id: string; username: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
}

export interface CoursesState {
  courses: Course[];
  currentTerm: Term | null;
  registrations: Registration[];
  studentCompletedCourses: number[];
  loading: boolean;
  error: string | null;
  message: { text: string; type: 'success' | 'error' | '' };
  loadData: (userId: string, token: string) => Promise<void>;
  registerForCourse: (userId: string, courseId: number, termId: number, token: string) => Promise<{ success: boolean; error?: string }>;
  isRegistered: (courseId: number) => boolean;
  canRegister: (course: Course) => boolean;
  getCourseName: (courseId: number) => string;
  clearMessage: () => void;
  reset: () => void;
}

// Mock Data types
export interface MockData {
  students: Student[];
  currentTerm: Term;
  courses: Course[];
  registrations: Record<string, never>;
}
