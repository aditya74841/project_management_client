import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/services/api";

/**
 * Senior Developer Auth Store
 * Handles user lifecycle, session management, and profile metadata.
 * Features automated persistence and centralized API integration.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ─── Initial State ───
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
      message: null,
      lastLogin: null,

      // ─── Actions ───

      // 1. Session Initialization/Restoration
      initialize: async () => {
        if (!get().isLoggedIn) return;
        try {
          set({ isLoading: true });
          const res = await api.get("/users/current-user");
          set({ user: res.data, isLoggedIn: true, isLoading: false });
        } catch (err) {
          get().logout();
          set({ isLoading: false });
        }
      },

      // 2. Authentication Flow
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/users/login", credentials);
          const { accessToken, refreshToken, user } = res.data;
          
          set({
            accessToken,
            refreshToken,
            user,
            isLoggedIn: true,
            isLoading: false,
            lastLogin: new Date().toISOString(),
            message: "Login successful",
          });
          return true;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/users/register", userData);
          set({ isLoading: false, message: res.message || "Registration successful" });
          return true;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          await api.get("/users/logout");
        } catch (err) {
          console.warn("Auth: Logout API call failed", err);
        } finally {
          // Comprehensive Reset - Middleware handles the localStorage update
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
            error: null,
            message: "Logged out successfully",
          });
        }
      },

      // 3. Profile & Security
      fetchProfile: async () => {
        set({ isLoading: true });
        try {
          const res = await api.get("/users/current-user");
          set({ user: res.data, isLoading: false, isLoggedIn: true });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/users/forgot-password", { email });
          set({ isLoading: false, message: res.message });
          return true;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return false;
        }
      },

      resetPassword: async (token, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post(`/users/reset-password/${token}`, { newPassword });
          set({ isLoading: false, message: res.message });
          return true;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return false;
        }
      },

      verifyEmail: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.get(`/users/verify-email/${token}`);
          set({ isLoading: false, message: res.message });
          return true;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return false;
        }
      },

      updateAvatar: async (formData) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/users/update-avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          set((state) => ({
            user: { ...state.user, avatar: res.data.avatar },
            isLoading: false,
            message: "Avatar updated",
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      // 4. Utility
      clearMessages: () => set({ error: null, message: null }),
      
      setError: (msg) => set({ error: msg }),
    }),
    {
      name: "auth-storage", // Standardized key used by api.js interceptor
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        lastLogin: state.lastLogin,
      }),
    }
  )
);

// Global Listener for Session Expiry (triggered by api.js)
if (typeof window !== "undefined") {
  window.addEventListener("auth-session-expired", () => {
    useAuthStore.getState().logout();
  });
}
