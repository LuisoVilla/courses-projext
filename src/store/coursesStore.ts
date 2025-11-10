import { create } from 'zustand';
import api from '../services/api';
import { mockData } from '../mocks/mockData';
import { CoursesState } from '../types';

export const useCoursesStore = create<CoursesState>((set, get) => ({
  // State
  courses: [],
  currentTerm: null,
  registrations: [],
  studentCompletedCourses: [],
  loading: false,
  error: null,
  message: { text: '', type: '' },

  // Actions
  loadData: async (userId: string, token: string) => {
    set({ loading: true, error: null });
    try {
      // Cargar término actual
      const termResponse = await api.getCurrentTerm(token);
      const term = termResponse.data;

      // Cargar cursos
      const coursesResponse = await api.getCourses(term.id, token);
      const courses = coursesResponse.data.courses;

      // Cargar registros del estudiante
      const registrationsResponse = await api.getStudentRegistrations(userId, token);
      const registrations = registrationsResponse.data.registrations;

      // Obtener cursos completados del estudiante desde mockData
      const student = mockData.students.find(s => s.id === userId);
      const completedCourses = student ? student.completedCourses : [];

      set({
        currentTerm: term,
        courses: courses,
        registrations: registrations,
        studentCompletedCourses: completedCourses,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error loading data:', err);
      const error = err as any;
      const errorMessage = error.response?.data?.error || error.message || 'Error loading data';
      set({
        loading: false,
        error: errorMessage,
        message: { text: errorMessage, type: 'error' },
      });
    }
  },

  registerForCourse: async (userId: string, courseId: number, termId: number, token: string) => {
    set({ message: { text: '', type: '' } });
    try {
      await api.registerForCourse(userId, courseId, termId, token);

      // Recargar registros
      const registrationsResponse = await api.getStudentRegistrations(userId, token);
      const registrations = registrationsResponse.data.registrations;

      set({
        registrations: registrations,
        message: { text: 'Successfully registered for the course!', type: 'success' },
      });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        set({ message: { text: '', type: '' } });
      }, 3000);

      return { success: true };
    } catch (err) {
      const error = err as any;
      const errorMessage = error.response?.data?.error || error.message || 'Error registering for course';
      set({
        message: { text: errorMessage, type: 'error' },
      });
      return { success: false, error: errorMessage };
    }
  },

  isRegistered: (courseId) => {
    const { registrations } = get();
    return registrations.some(reg => reg.course.id === courseId);
  },

  canRegister: (course) => {
    const { studentCompletedCourses } = get();
    return course.prereqs.every(prereqId => studentCompletedCourses.includes(prereqId));
  },

  getCourseName: (courseId) => {
    const { courses } = get();
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : `Course ${courseId}`;
  },

  clearMessage: () => {
    set({ message: { text: '', type: '' } });
  },

  reset: () => {
    set({
      courses: [],
      currentTerm: null,
      registrations: [],
      studentCompletedCourses: [],
      loading: false,
      error: null,
      message: { text: '', type: '' },
    });
  },
}));
