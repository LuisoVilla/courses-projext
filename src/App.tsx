import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { GlobalStyles } from './styles/GlobalStyles';
import { darkTheme, lightTheme } from './styles/theme';
import { ThemeToggle } from './components/ThemeToggle';
import Login from './pages/Login';
import Courses from './pages/Courses';

// Protected Route Component
function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Public Route Component (redirect to courses if already authenticated)
function PublicRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return !isAuthenticated ? children : <Navigate to="/courses" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  const themeMode = useThemeStore((state) => state.mode);
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <ThemeToggle />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
