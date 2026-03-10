import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ------------------- Axios instance -------------------
const api = axios.create({
  baseURL: process.env.USER_SERVER_URL || "http://localhost:8080/api/v1/users",
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

// ------------------- Async Thunks -------------------

// User Registration
export const userRegister = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Registration failed");
    }
  }
);

// User Login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Login failed");
    }
  }
);

// User Profile
export const userProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/current-user");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch profile";
      return rejectWithValue({ message, shouldLogout: err.response?.status === 401 });
    }
  }
);

// Refresh Access Token
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/refresh-token", {});
      return res.data;
    } catch (err) {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

// Logout
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/logout");
      return res.data;
    } catch (err) {
      return { message: "Logged out successfully" };
    }
  }
);

// Validate Auth on Start
export const validateAuthOnStart = createAsyncThunk(
  "auth/validateOnStart",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.isLoggedIn) {
      try {
        await dispatch(userProfile()).unwrap();
      } catch (error) {
        dispatch(resetAuth());
        return rejectWithValue("Session expired");
      }
    }
    return null;
  }
);

// Email Verification
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.get(`/verify-email/${token}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Email verification failed");
    }
  }
);

// Resend Verification Email
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/resend-verification", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend verification email");
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/forgot-password", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/reset-password/${token}`, { newPassword });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to reset password");
    }
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
  registrationSuccess: false,
  emailVerified: false,
  verificationMessage: null,
};

// ------------------- Slice -------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
      state.verificationMessage = null;
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
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    setExternalAuth: (state, action) => {
      state.accessToken = action.payload?.accessToken || "";
      state.refreshToken = action.payload?.refreshToken || "";
      state.isLoggedIn = true;
      state.lastLoginTime = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => { state.loading = true; state.registrationSuccess = false; })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.message = action.payload?.message || "Registration successful!";
      })
      .addCase(userRegister.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(userLogin.pending, (state) => { state.loading = true; })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload?.data?.accessToken || "";
        state.refreshToken = action.payload?.data?.refreshToken || "";
        state.isLoggedIn = true;
        state.message = action.payload?.message || "Login successful";
        state.lastLoginTime = Date.now();
      })
      .addCase(userLogin.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(userProfile.fulfilled, (state, action) => {
        state.profile = action.payload?.data;
        state.isLoggedIn = true;
      })
      .addCase(userProfile.rejected, (state, action) => {
        if (action.payload?.shouldLogout !== false) {
          state.isLoggedIn = false;
          state.profile = null;
        }
        state.error = action.payload?.message || action.payload;
      })

      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload?.data?.accessToken || "";
        state.refreshToken = action.payload?.data?.refreshToken || state.refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
      })

      .addCase(handleLogout.fulfilled, (state, action) => {
        Object.assign(state, initialState);
        state.message = action.payload?.message || "Logged out successfully";
      })
      .addCase(handleLogout.rejected, (state) => {
        Object.assign(state, initialState);
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.emailVerified = true;
        state.verificationMessage = action.payload?.message || "Verified!";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => { state.loading = true; })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Reset link sent to your email";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => { state.loading = true; })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Password reset successfully";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearMessages,
  clearError,
  setLoading,
  resetAuth,
  setTokenRefreshing,
  clearRegistrationSuccess,
  setExternalAuth,
} = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "isLoggedIn", "profile", "lastLoginTime", "emailVerified"],
};

export default persistReducer(persistConfig, authSlice.reducer);
