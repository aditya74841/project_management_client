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

// User Registration
export const userRegister = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

// User Login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", payload, { withCredentials: true });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// User Profile
export const userProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.accessToken;

      const res = await api.get("/current-user", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch profile";

      if (err.response?.status === 401) {
        return rejectWithValue({ message, shouldLogout: true });
      }

      return rejectWithValue({ message, shouldLogout: true });
    }
  }
);

// Refresh Access Token
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/refresh-token",
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

// Logout
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.accessToken;

      const res = await api.get("/logout", {});
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

    if (auth.isLoggedIn && auth.accessToken) {
      try {
        const result = await dispatch(userProfile()).unwrap();
        return result;
      } catch (error) {
        dispatch(resetAuth());
        return rejectWithValue("Session expired");
      }
    }

    return null;
  }
);

// Email Verification (Optional - if you want to handle it separately)
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.get(`/verify-email/${token}`);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Email verification failed";
      return rejectWithValue(message);
    }
  }
);

// Resend Verification Email (Optional)
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/resend-verification", { email });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to resend verification email";
      return rejectWithValue(message);
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
    socialLoginSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload?.data?.accessToken || "";
      state.refreshToken = action.payload?.data?.refreshToken || "";
      state.isLoggedIn = true;
      state.message = action.payload?.message || "Login successful";
      state.error = null;
      state.lastLoginTime = Date.now();
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.registrationSuccess = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.message =
          action.payload?.message ||
          "Registration successful! Please verify your email.";
        state.error = null;
        // Note: User is not logged in yet until email is verified
        // If you want auto-login after registration, uncomment below:
        // state.accessToken = action.payload?.data?.accessToken || "";
        // state.refreshToken = action.payload?.data?.refreshToken || "";
        // state.isLoggedIn = true;
        // state.profile = action.payload?.data?.user || null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.registrationSuccess = false;
      });

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
        state.registrationSuccess = false; // Clear registration flag
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.isLoggedIn = false;
      });

    // Profile
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

        if (action.payload?.shouldLogout === false) {
          state.error = action.payload?.message || action.payload;
        } else {
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
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
        state.message = action.payload?.message || "Logged out successfully";
        state.error = null;
        state.lastLoginTime = null;
        state.registrationSuccess = false;
        state.emailVerified = false;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.profile = null;
        state.error = null;
        state.lastLoginTime = null;
        state.registrationSuccess = false;
      });

    // Email Verification
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.verificationMessage = null;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.emailVerified = true;
        state.verificationMessage =
          action.payload?.message || "Email verified successfully!";
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.emailVerified = false;
        state.error = action.payload;
        state.verificationMessage = null;
      });

    // Resend Verification Email
    builder
      .addCase(resendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Verification email sent successfully!";
        state.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addMatcher(
      (action) => action.type === "auth/socialLogin/fulfilled",
      (state, action) => {
        state.loading = false;
        state.accessToken = action.payload?.data?.accessToken || "";
        state.refreshToken = action.payload?.data?.refreshToken || "";
        state.isLoggedIn = true;
        state.message = action.payload?.message || "Login successful";
        state.error = null;
        state.lastLoginTime = Date.now();
      }
    );
  },
});

export const {
  clearMessages,
  clearError,
  setLoading,
  resetAuth,
  setTokenRefreshing,
  clearRegistrationSuccess,
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
    "emailVerified",
  ],
  blacklist: [
    "loading",
    "error",
    "message",
    "tokenRefreshing",
    "registrationSuccess",
    "verificationMessage",
  ],
};

export default persistReducer(persistConfig, authSlice.reducer);

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // ------------------- Axios instance -------------------
// const api = axios.create({
//   baseURL: process.env.USER_SERVER_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   timeout: 10000,
// });

// // Simplified interceptors without store dependency
// api.interceptors.request.use(
//   (config) => {
//     // Token will be added by the calling function
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

// // ------------------- Async Thunks -------------------
// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async (payload, { rejectWithValue }) => {
//     try {
//       // console.log("The payload of login is", payload);
//       const res = await api.post("/login", payload, { withCredentials: true });
//       return res.data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message || "Login failed";
//       return rejectWithValue(message);
//     }
//   }
// );

// // export const userLogin = createAsyncThunk(
// //   "auth/login",
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       const res = await api.post("/login", payload, { withCredentials: true });
// //       // Server sets httpOnly cookies for accessToken & refreshToken
// //       return res.data; // contains user object & optionally accessToken if server sends it
// //     } catch (err) {
// //       const message = err.response?.data?.message || err.message || "Login failed";
// //       return rejectWithValue(message);
// //     }
// //   }
// // );

// export const userProfile = createAsyncThunk(
//   "auth/profile",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       // Get token from current state
//       const { auth } = getState();
//       const token = auth.accessToken;

//       const res = await api.get("/current-user", {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });

//       // console.log("The user profile is", res);
//       return res.data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message || "Failed to fetch profile";

//       // Check if it's a token-related error
//       if (err.response?.status === 401) {
//         return rejectWithValue({ message, shouldLogout: true }); // Changed to true for now
//       }

//       return rejectWithValue({ message, shouldLogout: true });
//     }
//   }
// );

// export const refreshAccessToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.post(
//         "/refresh-token",
//         {},
//         { withCredentials: true }
//       );
//       return res.data; // server returns new accessToken if refresh valid
//     } catch (err) {
//       return rejectWithValue("Session expired. Please login again.");
//     }
//   }
// );

// export const handleLogout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const token = auth.accessToken;

//       const res = await api.get(
//         "/logout",
//         {},
//         {
//           // headers: token ? { Authorization: `Bearer ${token}` } : {},
//           // withCredentials:true
//         }
//       );
//       return res.data;
//     } catch (err) {
//       return { message: "Logged out successfully" };
//     }
//   }
// );

// // export const handleLogout = createAsyncThunk(
// //   "auth/logout",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       // await api.post("/logout", {});
// //       await axios.get("/logout", { withCredentials: true });

// //       return { message: "Logged out successfully" };
// //     } catch (err) {
// //       return rejectWithValue({ message: "Logged out successfully" });
// //     }
// //   }
// // );

// export const validateAuthOnStart = createAsyncThunk(
//   "auth/validateOnStart",
//   async (_, { getState, dispatch, rejectWithValue }) => {
//     const { auth } = getState();

//     // If user appears logged in, validate with server
//     if (auth.isLoggedIn && auth.accessToken) {
//       try {
//         const result = await dispatch(userProfile()).unwrap();
//         return result;
//       } catch (error) {
//         // Token invalid, clear everything
//         dispatch(resetAuth());
//         return rejectWithValue("Session expired");
//       }
//     }

//     return null; // Not logged in, nothing to validate
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

//     // Profile - Fixed error handling
//     builder
//       .addCase(userProfile.pending, (state) => {
//         state.loading = false;
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

//         // FIXED: Proper logic for shouldLogout
//         if (action.payload?.shouldLogout === false) {
//           // Keep user logged in, just show error
//           state.error = action.payload?.message || action.payload;
//           // Don't change isLoggedIn or profile
//         } else {
//           // Log out the user
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
//         state.refreshToken =
//           action.payload?.data?.refreshToken || state.refreshToken;
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
//         console.log("The logout action is", action);

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

//     // builder.addCase(validateAuthOnStart.rejected, (state) => {
//     //   // Reset state if validation fails
//     //   state.isLoggedIn = false;
//     //   state.accessToken = "";
//     //   state.refreshToken = "";
//     //   state.profile = null;
//     // });
//   },
// });

// export const {
//   clearMessages,
//   clearError,
//   setLoading,
//   resetAuth,
//   setTokenRefreshing,
// } = authSlice.actions;

// const persistConfig = {
//   key: "auth",
//   storage,
//   whitelist: [
//     "accessToken",
//     "refreshToken",
//     "isLoggedIn",
//     "profile",
//     "lastLoginTime",
//   ],
//   blacklist: ["loading", "error", "message", "tokenRefreshing"],
// };

// export default persistReducer(persistConfig, authSlice.reducer);
