import { http, HttpResponse, delay } from 'msw';
import { mockData, generateToken } from './mockData';
import { Registration } from '../types';

// Base URL de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Storage para registros (simulando persistencia)
const registrationsStore: Record<string, Registration[]> = {};

export const handlers = [
  // POST /login
  http.post(`${API_BASE_URL}/login`, async ({ request }) => {
    await delay(500); // Simular latencia de red
    
    const body = await request.json() as { username: string; password: string };
    const { username, password } = body;
    
    const student = mockData.students.find(
      s => s.username === username && s.password === password
    );
    
    if (!student) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const token = generateToken(student.id);
    
    return HttpResponse.json({
      student: {
        id: student.id,
        username: student.username,
      },
      token,
    });
  }),

  // GET /current_term
  http.get(`${API_BASE_URL}/current_term`, async ({ request }) => {
    await delay(300);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json(mockData.currentTerm);
  }),

  // GET /terms/:id/courses
  http.get(`${API_BASE_URL}/terms/:id/courses`, async ({ request }) => {
    await delay(400);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json({
      courses: mockData.courses,
    });
  }),

  // GET /students/:id/registrations
  http.get(`${API_BASE_URL}/students/:id/registrations`, async ({ request, params }) => {
    await delay(350);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const studentId = params.id as string;
    const studentRegistrations = registrationsStore[studentId] || [];
    
    return HttpResponse.json({
      registrations: studentRegistrations,
    });
  }),

  // POST /students/:studentId/courses/:courseId/register
  http.post(`${API_BASE_URL}/students/:studentId/courses/:courseId/register`, async ({ request, params }) => {
    await delay(500);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { studentId, courseId } = params;
    const body = await request.json() as { termId: number };
    const { termId } = body;
    
    const student = mockData.students.find(s => s.id === studentId);
    const course = mockData.courses.find(c => c.id === parseInt(courseId as string));
    
    if (!student || !course) {
      return HttpResponse.json(
        { error: 'Student or course not found' },
        { status: 404 }
      );
    }
    
    // Verificar prerequisitos
    const hasPrereqs = course.prereqs.every(prereqId => 
      student.completedCourses.includes(prereqId)
    );
    
    if (!hasPrereqs) {
      return HttpResponse.json(
        { error: 'Prerequisites not met' },
        { status: 400 }
      );
    }
    
    // Verificar si ya está registrado
    const existingRegistrations = registrationsStore[studentId as string] || [];
    const alreadyRegistered = existingRegistrations.some(
      (reg: Registration) => reg.course.id === course.id && reg.term.id === termId
    );
    
    if (alreadyRegistered) {
      return HttpResponse.json(
        { error: 'Already registered for this course' },
        { status: 400 }
      );
    }
    
    // Crear nuevo registro
    const newRegistration: Registration = {
      id: Date.now(),
      course: course,
      term: mockData.currentTerm,
      status: 'enrolled',
    };
    
    // Guardar en el storage
    if (!registrationsStore[studentId as string]) {
      registrationsStore[studentId as string] = [];
    }
    registrationsStore[studentId as string].push(newRegistration);
    
    return HttpResponse.json({
      registration: newRegistration,
    }, { status: 201 });
  }),
];
