import axios from 'axios';
import { LoginResponse, Term, CoursesResponse, RegistrationsResponse, RegistrationResponse } from '../types';

// Base URL de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API Service
const api = {
  // POST /login
  login: async (username: string, password: string) => {
    const response = await apiClient.post<LoginResponse>('/login', {
      username,
      password,
    });
    return response;
  },

  // GET /current_term
  getCurrentTerm: async (token: string) => {
    const response = await apiClient.get<Term>('/current_term', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // GET /terms/{id}/courses
  getCourses: async (termId: number, token: string) => {
    const response = await apiClient.get<CoursesResponse>(`/terms/${termId}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // GET /students/{id}/registrations
  getStudentRegistrations: async (studentId: string, token: string) => {
    const response = await apiClient.get<RegistrationsResponse>(`/students/${studentId}/registrations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // POST /students/{studentId}/courses/{courseId}/register
  registerForCourse: async (studentId: string, courseId: number, termId: number, token: string) => {
    const response = await apiClient.post<RegistrationResponse>(
      `/students/${studentId}/courses/${courseId}/register`,
      {
        termId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  // Función helper para verificar prerequisitos
  checkPrerequisites: (_studentId: string, _courseId: number): boolean => {
    // Esta función se mantiene en el cliente
    return true;
  },
};

export default api;
