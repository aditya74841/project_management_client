// src/services/api.js
import axios from "axios";
import store from "@/app/store";
import { setAccessToken, handleLogout } from "@/components/HomePage/store";

// Create axios instance
const api = axios.create({
  baseURL: process.env.USER_SERVER_URL,
  withCredentials: true, // ensures refresh token cookie is sent
});

// Flag to avoid multiple refresh calls
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

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests until refresh finishes
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
        // Call refresh endpoint
        const { data } = await axios.post(
          `${process.env.USER_SERVER_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data?.data?.accessToken;

        if (newAccessToken) {
          // ✅ Save in Redux
          store.dispatch(setAccessToken(newAccessToken));

          // ✅ Process queued requests
          processQueue(null, newAccessToken);

          // ✅ Retry the failed request with new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        store.dispatch(handleLogout()); // logout if refresh fails
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
