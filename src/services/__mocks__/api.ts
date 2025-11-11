import { mockData } from '../../mocks/mockData';

const loginMock = (username: string, password: string) => {
  const student = mockData.students.find((s: any) => s.username === username && s.password === password);
  
  if (!student) {
    return Promise.reject(new Error('Invalid credentials'));
  }

  return Promise.resolve({
    data: {
      student: {
        id: student.id,
        username: student.username,
      },
      token: `mock-token-${student.id}-${Date.now()}`,
    },
  });
};

const getCurrentTermMock = () => {
  return Promise.resolve({
    data: mockData.currentTerm,
  });
};

const getCoursesMock = (_termId: number) => {
  return Promise.resolve({
    data: {
      courses: mockData.courses,
    },
  });
};

const getStudentRegistrationsMock = (studentId: string) => {
  const student = mockData.students.find((s: any) => s.id === studentId);
  
  if (!student) {
    return Promise.reject(new Error('Student not found'));
  }

  const registrations = student.completedCourses.map((courseId: any) => {
    const course = mockData.courses.find((c: any) => c.id === courseId);
    return {
      id: Date.now() + courseId,
      course: course!,
      term: mockData.currentTerm,
      status: 'enrolled' as const,
    };
  });

  return Promise.resolve({
    data: {
      registrations,
    },
  });
};

const registerForCourseMock = (_studentId: string, courseId: number, _termId: number) => {
  const course = mockData.courses.find((c: any) => c.id === courseId);
  
  if (!course) {
    return Promise.reject(new Error('Course not found'));
  }

  return Promise.resolve({
    data: {
      registration: {
        id: Date.now(),
        course,
        term: mockData.currentTerm,
        status: 'enrolled' as const,
      },
    },
  });
};

const checkPrerequisitesMock = (_studentId: string, _courseId: number) => {
  return true;
};

const api = {
  login: jest.fn(loginMock),
  getCurrentTerm: jest.fn(getCurrentTermMock),
  getCourses: jest.fn(getCoursesMock),
  getStudentRegistrations: jest.fn(getStudentRegistrationsMock),
  registerForCourse: jest.fn(registerForCourseMock),
  checkPrerequisites: jest.fn(checkPrerequisitesMock),
};

export default api;
