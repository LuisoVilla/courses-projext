import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Iniciar Mock Service Worker en desarrollo
async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    
    console.log('🔶 MSW Started');
  }

  root.render(
    <App />
  );
}

startApp().catch(console.error);
