import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      loading: false,
      error: null,

      // Computed
      isAuthenticated: () => {
        const state = get();
        return !!state.user && !!state.token;
      },

      // Actions
      login: async (username: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await api.login(username, password);
          const { student, token } = response.data;
          
          set({
            user: student,
            token: token,
            loading: false,
            error: null,
          });
          
          return { success: true };
        } catch (err) {
          const error = err as any;
          const errorMessage = error.response?.data?.error || error.message || 'Login failed';
          set({ loading: false, error: errorMessage });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
