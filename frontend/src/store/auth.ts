import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const extractApiErrorMessage = (error: any, fallback: string): string => {
  const data = error?.response?.data;
  if (!data) {
    if (error?.code === "ERR_NETWORK") {
      return "Cannot reach the API server. Verify backend is running and VITE_API_URL points to it.";
    }
    if (typeof error?.message === "string" && error.message.trim()) {
      return error.message;
    }
    return fallback;
  }

  if (typeof data.msg === "string" && data.msg.trim()) return data.msg;
  if (typeof data.message === "string" && data.message.trim()) return data.message;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const firstError = data.errors[0];
    if (typeof firstError?.message === "string" && firstError.message.trim()) {
      return firstError.message;
    }
  }

  return fallback;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        const normalizedUsername = username.trim();
        try {
          const response = await api.post("/users/signin", {
            username: normalizedUsername,
            password,
          });
          const { token } = response.data;

          // Store token in localStorage for API interceptor
          localStorage.setItem("token", token);

          // Decode username from response or token
          set({
            token,
            isAuthenticated: true,
            user: { id: "", username: normalizedUsername },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: extractApiErrorMessage(error, "Login failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      signup: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        const normalizedUsername = username.trim();
        try {
          await api.post("/users/signup", {
            username: normalizedUsername,
            password,
          });
          // After successful signup, automatically login
          await get().login(normalizedUsername, password);
        } catch (error: any) {
          set({
            error: extractApiErrorMessage(error, "Signup failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
