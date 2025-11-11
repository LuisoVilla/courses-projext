import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Iniciar Mock Service Worker (en desarrollo y producción para esta demo)
async function startApp() {
  // Habilitar MSW tanto en desarrollo como en producción
  // ya que esta app usa datos mock en lugar de un backend real
  const { worker } = await import('./mocks/browser');
  
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
  
  console.log('🔶 MSW Started in', process.env.NODE_ENV);

  root.render(
    <App />
  );
}

startApp().catch(console.error);
