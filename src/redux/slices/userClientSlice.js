// redux/slices/userClientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------- Axios instance -------------------
const api = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
});

// Helper function to get auth token
const getAuthHeaders = (getState) => {
  const { auth } = getState();
  const token = auth.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ------------------- Async Thunks -------------------

// Create User
export const createUser = createAsyncThunk(
  "userClient/createUser",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // console.log("The getSate is ",getState())

      const headers = getAuthHeaders(getState);

      const res = await api.post("/companies/create-user", payload, {
        headers,
      });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to create user";
      return rejectWithValue(message);
    }
  }
);

// Get All Users
export const getUsers = createAsyncThunk(
  "userClient/getUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get("/companies/get-users", { headers });

      console.log("getSate", getState());

      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch users";
      return rejectWithValue(message);
    }
  }
);

// Change User Role
export const changeUserRole = createAsyncThunk(
  "userClient/changeUserRole",
  async ({ userId, ...payload }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/companies/${userId}/change-role`, payload, {
        headers,
      });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to change user role";
      return rejectWithValue(message);
    }
  }
);

// ------------------- Initial State -------------------
const initialState = {
  loading: false,
  creating: false,
  updating: false,
  users: [],
  company: null,
  owner: null,
  stats: null,
  context: null,
  error: null,
  message: null,
};

// ------------------- Slice -------------------
const userClientSlice = createSlice({
  name: "userClient",
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
    resetUserClientState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;
        // Add new user to users array if it exists
        if (action.payload?.data?.user) {
          state.users.push(action.payload.data.user);
        }
        state.message = action.payload?.message || "User created successfully";
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
        state.message = null;
      });

    // Get Users
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        console.log("The dataaa is ",data?.users)

        state.users = data?.users || [];
        state.company = data?.company || null;
        state.owner = data?.owner || null;
        state.stats = data?.stats || null;
        state.context = data?.context || null;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.users = [];
        state.company = null;
        state.owner = null;
        state.stats = null;
        state.context = null;
      });

    // Change User Role
    builder
      .addCase(changeUserRole.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.message = null;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.updating = false;

        // Update user role in users array if user data is returned
        if (action.payload?.data?.user) {
          const updatedUser = action.payload.data.user;
          const index = state.users.findIndex(
            (user) => user._id === updatedUser._id
          );
          if (index !== -1) {
            state.users[index] = { ...state.users[index], ...updatedUser };
          }
        }

        state.message =
          action.payload?.message || "User role updated successfully";
        state.error = null;
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

// ------------------- Actions -------------------
export const { clearMessages, clearError, setLoading, resetUserClientState } =
  userClientSlice.actions;

// ------------------- Selectors -------------------
// ------------------- Selectors -------------------
export const selectUsers = (state) => state.userClient?.users || [];
export const selectCompanyInfo = (state) => state.userClient?.company || null;
export const selectOwnerInfo = (state) => state.userClient?.owner || null;
export const selectUserStats = (state) => state.userClient?.stats || null;
export const selectUserContext = (state) => state.userClient?.context || null;
export const selectUserClientLoading = (state) =>
  state.userClient?.loading || false;
export const selectUserClientCreating = (state) =>
  state.userClient?.creating || false;
export const selectUserClientUpdating = (state) =>
  state.userClient?.updating || false;
export const selectUserClientError = (state) => state.userClient?.error || null;
export const selectUserClientMessage = (state) =>
  state.userClient?.message || null;

// Additional useful selectors
export const selectTotalUsers = (state) => state.userClient?.users?.length || 0;
export const selectCurrentUser = (state) =>
  state.userClient?.users?.find((user) => user.isCurrentUser) || null;
export const selectUsersByRole = (role) => (state) =>
  state.userClient?.users?.filter((user) => user.role === role) || [];
export const selectVerifiedUsers = (state) =>
  state.userClient?.users?.filter((user) => user.isEmailVerified) || [];
export const selectUnverifiedUsers = (state) =>
  state.userClient?.users?.filter((user) => !user.isEmailVerified) || [];
export const selectIsLoading = (state) =>
  state.userClient?.loading ||
  state.userClient?.creating ||
  state.userClient?.updating ||
  false;
export const selectCompanyStatus = (state) =>
  state.userClient?.company?.status || null;
export const selectIsViewingOwnCompany = (state) =>
  state.userClient?.context?.isViewingOwnCompany || false;

export default userClientSlice.reducer;
