import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  timeout: 10000,
});

const getAuthHeaders = (getState) => {
  const { auth } = getState();
  const token = auth.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Thunks ---

export const getProjectNames = createAsyncThunk(
  "feature/getProjectNames",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get("/features/get-project-name", { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch project names");
    }
  }
);

export const createFeature = createAsyncThunk(
  "feature/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post("/features", payload, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create feature");
    }
  }
);

export const getFeaturesByProjectId = createAsyncThunk(
  "feature/getByProjectId",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/features/project/${projectId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch features");
    }
  }
);

export const getFeatureById = createAsyncThunk(
  "feature/getById",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/features/${featureId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch feature");
    }
  }
);

export const updateFeatureDetails = createAsyncThunk(
  "feature/updateDetails",
  async ({ featureId, ...payload }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}`, payload, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update feature");
    }
  }
);

export const deleteFeature = createAsyncThunk(
  "feature/delete",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      await api.delete(`/features/${featureId}`, { headers });
      return { deletedId: featureId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete feature");
    }
  }
);

export const toggleFeatureCompletion = createAsyncThunk(
  "feature/toggleCompletion",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/toggle-completion`, {}, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle completion");
    }
  }
);

// --- Checklist (Questions) ---

export const createFeatureQuestion = createAsyncThunk(
  "feature/createQuestion",
  async ({ featureId, name, answer }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(`/features/${featureId}/questions`, { name, answer }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add question");
    }
  }
);

export const toggleQuestionCompletion = createAsyncThunk(
  "feature/toggleQuestion",
  async ({ featureId, questionId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/questions/${questionId}/toggle-completion`, {}, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle question");
    }
  }
);

export const deleteFeatureQuestion = createAsyncThunk(
  "feature/deleteQuestion",
  async ({ featureId, questionId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/features/${featureId}/questions/${questionId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete question");
    }
  }
);

export const updateFeatureQuestion = createAsyncThunk(
  "feature/updateQuestion",
  async ({ featureId, questionId, name, answer }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/questions/${questionId}`, { name, answer }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update question");
    }
  }
);

// --- Workflow ---

export const addFeatureWorkflow = createAsyncThunk(
  "feature/addWorkflow",
  async ({ featureId, flow }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(`/features/${featureId}/workflow`, { flow }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add workflow step");
    }
  }
);

export const updateFeatureWorkflow = createAsyncThunk(
  "feature/updateWorkflow",
  async ({ featureId, workflowId, flow }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/workflow/${workflowId}`, { flow }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update workflow step");
    }
  }
);

export const deleteFeatureWorkflow = createAsyncThunk(
  "feature/deleteWorkflow",
  async ({ featureId, workflowId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/features/${featureId}/workflow/${workflowId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete workflow step");
    }
  }
);

// --- Comments ---

export const addFeatureComment = createAsyncThunk(
  "feature/addComment",
  async ({ featureId, text }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(`/features/${featureId}/add-comment`, { text }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add comment");
    }
  }
);

export const deleteFeatureComment = createAsyncThunk(
  "feature/deleteComment",
  async ({ featureId, commentId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/features/${featureId}/comments/${commentId}`, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete comment");
    }
  }
);

export const updateFeatureComment = createAsyncThunk(
  "feature/updateComment",
  async ({ featureId, commentId, text }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/update-comment/${commentId}`, { text }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update comment");
    }
  }
);

// --- Priority, Status, Deadline ---

export const updateFeaturePriority = createAsyncThunk(
  "feature/updatePriority",
  async ({ featureId, priority }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/change-priority`, { priority }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update priority");
    }
  }
);

export const updateFeatureStatus = createAsyncThunk(
  "feature/updateStatus",
  async ({ featureId, status }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}/change-status`, { status }, { headers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);

// --- Slice ---

const initialState = {
  loading: false,
  features: [],
  projectNames: [],
  selectedFeature: null,
  error: null,
  message: null,
  creating: false,
  updating: false,
  deleting: false,
  loadingProjectNames: false,
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    resetFeatureState: () => initialState,
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Project Names
      .addCase(getProjectNames.pending, (state) => { state.loadingProjectNames = true; })
      .addCase(getProjectNames.fulfilled, (state, action) => {
        state.loadingProjectNames = false;
        state.projectNames = action.payload.data;
      })
      .addCase(getProjectNames.rejected, (state, action) => {
        state.loadingProjectNames = false;
        state.error = action.payload;
      })
      // Fetch Features
      .addCase(getFeaturesByProjectId.pending, (state) => { state.loading = true; })
      .addCase(getFeaturesByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload.data.features;
      })
      .addCase(getFeaturesByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Feature
      .addCase(createFeature.pending, (state) => { state.creating = true; })
      .addCase(createFeature.fulfilled, (state, action) => {
        state.creating = false;
        state.features.unshift(action.payload.data.feature);
        state.message = "Feature created successfully";
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      // Delete Feature
      .addCase(deleteFeature.pending, (state) => { state.deleting = true; })
      .addCase(deleteFeature.fulfilled, (state, action) => {
        state.deleting = false;
        state.features = state.features.filter(f => f._id !== action.payload.deletedId);
        if (state.selectedFeature?._id === action.payload.deletedId) state.selectedFeature = null;
        state.message = "Feature deleted successfully";
      })
      .addCase(deleteFeature.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      // Update Feature (All types)
      .addMatcher(
        (action) => action.type.endsWith("/pending") && (action.type.startsWith("feature/update") || action.type.startsWith("feature/toggle") || action.type.startsWith("feature/createQuestion") || action.type.startsWith("feature/deleteQuestion") || action.type.startsWith("feature/addWorkflow") || action.type.startsWith("feature/deleteWorkflow") || action.type.startsWith("feature/addComment") || action.type.startsWith("feature/deleteComment")),
        (state) => { state.updating = true; }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && (action.type.startsWith("feature/update") || action.type.startsWith("feature/toggle") || action.type.startsWith("feature/createQuestion") || action.type.startsWith("feature/deleteQuestion") || action.type.startsWith("feature/addWorkflow") || action.type.startsWith("feature/deleteWorkflow") || action.type.startsWith("feature/addComment") || action.type.startsWith("feature/deleteComment")),
        (state, action) => { 
          state.updating = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && (action.type.startsWith("feature/update") || action.type.startsWith("feature/toggle") || action.type.startsWith("feature/createQuestion") || action.type.startsWith("feature/deleteQuestion") || action.type.startsWith("feature/addWorkflow") || action.type.startsWith("feature/deleteWorkflow") || action.type.startsWith("feature/addComment") || action.type.startsWith("feature/deleteComment")),
        (state, action) => {
          state.updating = false;
          if (action.payload.data?.feature || action.payload.data?.questions || action.payload.data?.workFlow || action.payload.data?.comments) {
            const updatedFeature = action.payload.data.feature || (state.selectedFeature && { ...state.selectedFeature, ...action.payload.data });
            if (updatedFeature) {
              const idx = state.features.findIndex(f => f._id === updatedFeature._id);
              if (idx !== -1) state.features[idx] = updatedFeature;
              if (state.selectedFeature?._id === updatedFeature._id) state.selectedFeature = updatedFeature;
            }
          }
        }
      );
  },
});

export const { clearMessages, resetFeatureState, setSelectedFeature } = featureSlice.actions;

// Selectors
export const selectFeatures = (state) => state.feature.features;
export const selectProjectNames = (state) => state.feature.projectNames;
export const selectSelectedFeature = (state) => state.feature.selectedFeature;
export const selectFeatureLoading = (state) => state.feature.loading;
export const selectFeatureCreating = (state) => state.feature.creating;
export const selectFeatureUpdating = (state) => state.feature.updating;
export const selectFeatureDeleting = (state) => state.feature.deleting;
export const selectProjectNamesLoading = (state) => state.feature.loadingProjectNames;
export const selectFeatureError = (state) => state.feature.error;
export const selectFeatureMessage = (state) => state.feature.message;

export default featureSlice.reducer;
