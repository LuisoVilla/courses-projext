import { MockData } from '../types';

// Mock data para simular la base de datos
export const mockData: MockData = {
  students: [
    {
      id: '001',
      username: 'student001',
      password: 'pass123',
      completedCourses: [1, 2], // IDs de cursos completados
    },
    {
      id: '002',
      username: 'student002',
      password: 'pass123',
      completedCourses: [1],
    },
    {
      id: '003',
      username: 'student003',
      password: 'pass123',
      completedCourses: [],
    },
  ],
  
  currentTerm: {
    id: 1,
    name: 'Spring 2024',
    start_date: '2024-01-15',
    end_date: '2024-05-15',
  },

  courses: [
    {
      id: 1,
      name: 'Introduction to Programming',
      prereqs: [],
    },
    {
      id: 2,
      name: 'Data Structures',
      prereqs: [1],
    },
    {
      id: 3,
      name: 'Algorithms',
      prereqs: [1, 2],
    },
    {
      id: 4,
      name: 'Web Development',
      prereqs: [1],
    },
    {
      id: 5,
      name: 'Advanced Web Development',
      prereqs: [4],
    },
    {
      id: 6,
      name: 'Database Systems',
      prereqs: [2],
    },
    {
      id: 7,
      name: 'Machine Learning',
      prereqs: [2, 3],
    },
    {
      id: 8,
      name: 'Computer Networks',
      prereqs: [1],
    },
  ],

  registrations: {},
};

// Función helper para generar tokens
export const generateToken = (studentId: string): string => {
  return `mock-token-${studentId}-${Date.now()}`;
};
