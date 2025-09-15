// // src/services/api.js
// import axios from "axios";
// import store from "@/app/store";
// import { setAccessToken, handleLogout } from "@/components/HomePage/store";

// // Create axios instance
// const api = axios.create({
//   baseURL: process.env.USER_SERVER_URL,
//   withCredentials: true, // ensures refresh token cookie is sent
// });

// // Flag to avoid multiple refresh calls
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// // Add response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 → try refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // queue requests until refresh finishes
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Call refresh endpoint
//         const { data } = await axios.post(
//           `${process.env.USER_SERVER_URL}/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = data?.data?.accessToken;

//         if (newAccessToken) {
//           // ✅ Save in Redux
//           store.dispatch(setAccessToken(newAccessToken));

//           // ✅ Process queued requests
//           processQueue(null, newAccessToken);

//           // ✅ Retry the failed request with new token
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         }
//       } catch (err) {
//         processQueue(err, null);
//         store.dispatch(handleLogout()); // logout if refresh fails
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



// src/services/api.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
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

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (since we can't import store here)
    const persistedAuth = localStorage.getItem('persist:auth');
    if (persistedAuth) {
      try {
        const authData = JSON.parse(persistedAuth);
        const accessToken = authData.accessToken ? JSON.parse(authData.accessToken) : null;
        
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing auth token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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
        // Call refresh endpoint
        const { data } = await axios.post(
          `${process.env.USER_SERVER_URL || "http://localhost:5000/api"}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data?.data?.accessToken;

        if (newAccessToken) {
          // Update localStorage directly
          const persistedAuth = localStorage.getItem('persist:auth');
          if (persistedAuth) {
            const authData = JSON.parse(persistedAuth);
            authData.accessToken = JSON.stringify(newAccessToken);
            localStorage.setItem('persist:auth', JSON.stringify(authData));
          }

          // Process queued requests
          processQueue(null, newAccessToken);

          // Retry the failed request with new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        
        // Clear auth data on refresh failure
        localStorage.removeItem('persist:auth');
        window.location.href = '/';
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
