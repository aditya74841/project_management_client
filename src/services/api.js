import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";

/**
 * Global API Service
 * Centralized Axios instance with advanced interceptors for
 * authentication, error handling, and response normalization.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVER_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh calls simultaneously
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    // Global Loading Pulse
    useLoadingStore.getState().startRequest();

    // 1. Attempt to get token from storage
    // Note: We use a standardized key 'auth-storage' for Zustand persistence later
    const persistedData = localStorage.getItem("auth-storage");
    if (persistedData) {
      try {
        const { state } = JSON.parse(persistedData);
        if (state?.accessToken) {
          config.headers.Authorization = `Bearer ${state.accessToken}`;
        }
      } catch (err) {
        console.error("API: Auth Header Attachment Failed", err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ─── Response Interceptor ─── */
api.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().stopRequest();
    // Automatically extract data to reduce boilerplate in components
    return response.data;
  },
  async (error) => {
    useLoadingStore.getState().stopRequest();
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token Expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt Token Refresh
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data?.data?.accessToken;

        if (newAccessToken) {
          // Update storage manually if needed (Zustand usually handles this, 
          // but we ensure immediate availability for the queue)
          const persistedData = localStorage.getItem("auth-storage");
          if (persistedData) {
            const parsed = JSON.parse(persistedData);
            parsed.state.accessToken = newAccessToken;
            localStorage.setItem("auth-storage", JSON.stringify(parsed));
          }

          processQueue(null, newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Critical: Handle Refresh Failure (Logout)
        // We trigger an event that the Auth store can listen to
        window.dispatchEvent(new Event("auth-session-expired"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Enhance error message for the UI
    const message = error.response?.data?.message || "An unexpected network error occurred.";
    return Promise.reject({ ...error, message });
  }
);

export default api;
