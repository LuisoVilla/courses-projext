import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configurar el service worker para el navegador
export const worker = setupWorker(...handlers);
