import { mockData } from '../../mocks/mockData';

export const login = jest.fn((username: string, password: string) => {
  const student = mockData.students.find((s: any) => s.username === username && s.password === password);
  
  if (!student) {
    return Promise.reject(new Error('Invalid credentials'));
  }

  return Promise.resolve({
    student: {
      id: student.id,
      username: student.username,
    },
    token: `mock-token-${student.id}-${Date.now()}`,
  });
});

export const getCurrentTerm = jest.fn(() => {
  return Promise.resolve(mockData.currentTerm);
});

export const getCourses = jest.fn((_termId: number) => {
  return Promise.resolve({
    courses: mockData.courses,
  });
});

export const getStudentRegistrations = jest.fn((studentId: string) => {
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
    registrations,
  });
});

export const registerForCourse = jest.fn((_studentId: string, courseId: number, _termId: number) => {
  const course = mockData.courses.find((c: any) => c.id === courseId);
  
  if (!course) {
    return Promise.reject(new Error('Course not found'));
  }

  return Promise.resolve({
    registration: {
      id: Date.now(),
      course,
      term: mockData.currentTerm,
      status: 'enrolled' as const,
    },
  });
});
