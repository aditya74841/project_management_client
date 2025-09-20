import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ------------------- Axios instance -------------------
const api = axios.create({
  baseURL: process.env.USER_SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
});

// Simplified interceptors without store dependency
api.interceptors.request.use(
  (config) => {
    // Token will be added by the calling function
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

// ------------------- Async Thunks -------------------
export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("The payload of login is", payload);
      const res = await api.post("/login", payload, { withCredentials: true });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/login", payload, { withCredentials: true });
//       // Server sets httpOnly cookies for accessToken & refreshToken
//       return res.data; // contains user object & optionally accessToken if server sends it
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Login failed";
//       return rejectWithValue(message);
//     }
//   }
// );

export const userProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get token from current state
      const { auth } = getState();
      const token = auth.accessToken;

      const res = await api.get("/current-user", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      // console.log("The user profile is", res);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch profile";

      // Check if it's a token-related error
      if (err.response?.status === 401) {
        return rejectWithValue({ message, shouldLogout: true }); // Changed to true for now
      }

      return rejectWithValue({ message, shouldLogout: true });
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/refresh-token",
        {},
        { withCredentials: true }
      );
      return res.data; // server returns new accessToken if refresh valid
    } catch (err) {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.accessToken;

      const res = await api.get(
        "/logout",
        {},
        {
          // headers: token ? { Authorization: `Bearer ${token}` } : {},
          // withCredentials:true
        }
      );
      return res.data;
    } catch (err) {
      return { message: "Logged out successfully" };
    }
  }
);

// export const handleLogout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       // await api.post("/logout", {});
//       await axios.get("/logout", { withCredentials: true });

//       return { message: "Logged out successfully" };
//     } catch (err) {
//       return rejectWithValue({ message: "Logged out successfully" });
//     }
//   }
// );

export const validateAuthOnStart = createAsyncThunk(
  "auth/validateOnStart",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState();

    // If user appears logged in, validate with server
    if (auth.isLoggedIn && auth.accessToken) {
      try {
        const result = await dispatch(userProfile()).unwrap();
        return result;
      } catch (error) {
        // Token invalid, clear everything
        dispatch(resetAuth());
        return rejectWithValue("Session expired");
      }
    }

    return null; // Not logged in, nothing to validate
  }
);

// ------------------- Initial State -------------------
const initialState = {
  loading: false,
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  profile: null,
  error: null,
  message: null,
  lastLoginTime: null,
  tokenRefreshing: false,
};

// ------------------- Slice -------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetAuth: () => initialState,
    setTokenRefreshing: (state, action) => {
      state.tokenRefreshing = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload?.data?.accessToken || "";
        state.refreshToken = action.payload?.data?.refreshToken || "";
        state.isLoggedIn = true;
        state.message = action.payload?.message || "Login successful";
        state.error = null;
        state.lastLoginTime = Date.now();
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.isLoggedIn = false;
      });

    // Profile - Fixed error handling
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload?.data;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;

        // FIXED: Proper logic for shouldLogout
        if (action.payload?.shouldLogout === false) {
          // Keep user logged in, just show error
          state.error = action.payload?.message || action.payload;
          // Don't change isLoggedIn or profile
        } else {
          // Log out the user
          state.isLoggedIn = false;
          state.profile = null;
          state.error = action.payload?.message || action.payload;
        }
      });

    // Refresh Token
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.tokenRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.tokenRefreshing = false;
        state.accessToken = action.payload?.data?.accessToken || "";
        state.refreshToken =
          action.payload?.data?.refreshToken || state.refreshToken;
        state.message = "Session refreshed";
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.tokenRefreshing = false;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
        state.error = "Session expired. Please login again.";
      });

    // Logout
    builder
      .addCase(handleLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        console.log("The logout action is", action);

        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
        state.message = action.payload?.message || "Logged out successfully";
        state.error = null;
        state.lastLoginTime = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
        state.error = null;
        state.lastLoginTime = null;
      });

    // builder.addCase(validateAuthOnStart.rejected, (state) => {
    //   // Reset state if validation fails
    //   state.isLoggedIn = false;
    //   state.accessToken = "";
    //   state.refreshToken = "";
    //   state.profile = null;
    // });
  },
});

export const {
  clearMessages,
  clearError,
  setLoading,
  resetAuth,
  setTokenRefreshing,
} = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "accessToken",
    "refreshToken",
    "isLoggedIn",
    "profile",
    "lastLoginTime",
  ],
  blacklist: ["loading", "error", "message", "tokenRefreshing"],
};

export default persistReducer(persistConfig, authSlice.reducer);

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import store from "../store"
// // ------------------- Axios instance -------------------
// const api = axios.create({
//   baseURL: process.env.USER_SERVER_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   timeout: 10000,
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//   (config) => {
//     // Get token from Redux store if available
//     const state = store?.getState?.();
//     const token = state?.auth?.accessToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Enhanced response interceptor with token refresh logic
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Try to refresh the token
//         const state = store?.getState?.();
//         const refreshToken = state?.auth?.refreshToken;

//         if (refreshToken) {
//           const refreshResponse = await axios.post(
//             `${process.env.USER_SERVER_URL}/refresh-token`,
//             { refreshToken },
//             { withCredentials: true }
//           );

//           const newAccessToken = refreshResponse.data?.data?.accessToken;

//           if (newAccessToken) {
//             // Update the original request with new token
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//             // Dispatch action to update tokens in Redux
//             store.dispatch({
//               type: 'auth/refreshAccessToken/fulfilled',
//               payload: refreshResponse.data
//             });

//             // Retry the original request
//             return api(originalRequest);
//           }
//         }
//       } catch (refreshError) {
//         // Refresh failed, user needs to login again
//         store.dispatch({ type: 'auth/resetAuth' });
//         window.location.href = '/';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ------------------- Async Thunks -------------------
// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async (payload, { rejectWithValue }) => {
//     try {

//       console.log("The payload of login is ",payload)
//       const res = await api.post("/login", payload);
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Login failed";
//       return rejectWithValue(message);
//     }
//   }
// );

// export const userProfile = createAsyncThunk(
//   "auth/profile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const res = await api.get("/current-user");
//       console.log("The user profile is",res)
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to fetch profile";

//       // Check if it's a token-related error
//       if (err.response?.status === 401) {
//         // Don't immediately log out, let interceptor handle token refresh
//         return rejectWithValue({ message, shouldLogout: false });
//       }

//       return rejectWithValue({ message, shouldLogout: true });
//     }
//   }
// );

// export const refreshAccessToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth } = getState();
//       const res = await api.post("/refresh-token", {
//         refreshToken: auth.refreshToken
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Token refresh failed");
//     }
//   }
// );

// export const handleLogout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/logout");
//       return res.data;
//     } catch (err) {
//       return { message: "Logged out successfully" };
//     }
//   }
// );

// // ------------------- Initial State -------------------
// const initialState = {
//   loading: false,
//   accessToken: "",
//   refreshToken: "",
//   isLoggedIn: false,
//   profile: null,
//   error: null,
//   message: null,
//   lastLoginTime: null,
//   tokenRefreshing: false,
// };

// // ------------------- Slice -------------------
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearMessages: (state) => {
//       state.error = null;
//       state.message = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     resetAuth: () => initialState,
//     setTokenRefreshing: (state, action) => {
//       state.tokenRefreshing = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     // Login
//     builder
//       .addCase(userLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(userLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload?.data?.accessToken || "";
//         state.refreshToken = action.payload?.data?.refreshToken || "";
//         state.isLoggedIn = true;
//         state.message = action.payload?.message || "Login successful";
//         state.error = null;
//         state.lastLoginTime = Date.now();
//       })
//       .addCase(userLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.message = null;
//         state.isLoggedIn = false;
//       });

//     // Profile - Enhanced error handling
//     builder
//       .addCase(userProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userProfile.fulfilled, (state, action) => {

//         state.loading = false;
//         state.profile = action.payload?.data;
//         state.isLoggedIn = true;
//         state.error = null;
//       })
//       .addCase(userProfile.rejected, (state, action) => {
//         state.loading = false;

//         // Check if we should log out the user
//         if (action.payload?.shouldLogout !== false) {
//           state.isLoggedIn = false;
//           state.profile = null;
//           state.error = action.payload?.message || action.payload;
//         } else {
//           // Keep user logged in, just show error
//           state.isLoggedIn = false;
//           state.profile = null;
//           state.error = action.payload?.message || action.payload;
//         }
//       });

//     // Refresh Token
//     builder
//       .addCase(refreshAccessToken.pending, (state) => {
//         state.tokenRefreshing = true;
//       })
//       .addCase(refreshAccessToken.fulfilled, (state, action) => {
//         state.tokenRefreshing = false;
//         state.accessToken = action.payload?.data?.accessToken || "";
//         state.refreshToken = action.payload?.data?.refreshToken || state.refreshToken;
//         state.message = "Session refreshed";
//         state.error = null;
//       })
//       .addCase(refreshAccessToken.rejected, (state, action) => {
//         state.tokenRefreshing = false;
//         state.isLoggedIn = false;
//         state.accessToken = "";
//         state.refreshToken = "";
//         state.profile = null;
//         state.error = "Session expired. Please login again.";
//       });

//     // Logout
//     builder
//       .addCase(handleLogout.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(handleLogout.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isLoggedIn = false;
//         state.accessToken = "";
//         state.refreshToken = "";
//         state.profile = null;
//         state.message = action.payload?.message || "Logged out successfully";
//         state.error = null;
//         state.lastLoginTime = null;
//       })
//       .addCase(handleLogout.rejected, (state, action) => {
//         state.loading = false;
//         state.isLoggedIn = false;
//         state.accessToken = "";
//         state.refreshToken = "";
//         state.profile = null;
//         state.error = null;
//         state.lastLoginTime = null;
//       });
//   },
// });

// export const { clearMessages, clearError, setLoading, resetAuth, setTokenRefreshing } = authSlice.actions;

// const persistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["accessToken", "refreshToken", "isLoggedIn", "profile", "lastLoginTime"],
//   blacklist: ["loading", "error", "message", "tokenRefreshing"],
// };

// export default persistReducer(persistConfig, authSlice.reducer);
