// redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ------------------------------------------------- */
/*  Axios instance                                   */
/* ------------------------------------------------- */
const api = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
});

/* Pull token from auth slice */
const getAuthHeaders = (getState) => {
  const { auth } = getState();
  const token = auth.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ------------------------------------------------- */
/*  Async thunks                                     */
/* ------------------------------------------------- */

/* Create project */
export const createProject = createAsyncThunk(
  "project/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post("/projects", payload, { headers });
      return res.data; // { project, message }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create project";
      return rejectWithValue(msg);
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get("/projects", { headers }); // GET same path


      return res.data; // { projects, message }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch projects";
      return rejectWithValue(msg);
    }
  }
);

/* Get single project by ID */
export const getProjectById = createAsyncThunk(
  "project/getById",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/projects/${projectId}`, { headers });
      return res.data; // { project, message }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to fetch project";
      return rejectWithValue(msg);
    }
  }
);

/* Update project */
export const updateProject = createAsyncThunk(
  "project/update",
  async ({ projectId, ...payload }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/projects/${projectId}`, payload, {
        headers,
      });
      return res.data; // { project, message }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to update project";
      return rejectWithValue(msg);
    }
  }
);

/* Delete project */
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/projects/${projectId}`, { headers });
      return { ...res.data, deletedId: projectId }; // keep the id for reducer
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete project";
      return rejectWithValue(msg);
    }
  }
);

/* Toggle visibility */
export const toggleProjectVisibility = createAsyncThunk(
  "project/toggleVisibility",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(
        `/projects/${projectId}/toggle-visibility`,
        {},
        { headers }
      );
      return { ...res.data, projectId };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to toggle visibility";
      return rejectWithValue(msg);
    }
  }
);

/* Member management */
export const addMemberToProject = createAsyncThunk(
  "project/addMember",
  async ({ projectId, userId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(
        `/projects/${projectId}/members`,
        { userId },
        { headers }
      );
      return { ...res.data, projectId };
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to add member";
      return rejectWithValue(msg);
    }
  }
);

export const removeMemberFromProject = createAsyncThunk(
  "project/removeMember",
  async ({ projectId, userId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/projects/${projectId}/members`, {
        headers,
        data: { userId }, // axios delete with body
      });
      return { ...res.data, projectId, userId };
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to remove member";
      return rejectWithValue(msg);
    }
  }
);

/* Feature management */
export const assignFeatureToProject = createAsyncThunk(
  "project/assignFeature",
  async ({ projectId, featureId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(
        `/projects/${projectId}/features`,
        { featureId },
        { headers }
      );
      return { ...res.data, projectId };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to assign feature";
      return rejectWithValue(msg);
    }
  }
);

export const unassignFeatureFromProject = createAsyncThunk(
  "project/unassignFeature",
  async ({ projectId, featureId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/projects/${projectId}/features`, {
        headers,
        data: { featureId },
      });
      return { ...res.data, projectId, featureId };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to unassign feature";
      return rejectWithValue(msg);
    }
  }
);

/* ------------------------------------------------- */
/*  Initial state                                    */
/* ------------------------------------------------- */
const initialState = {
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  toggling: false,
  projects: [], // list (if you later add a list endpoint)
  selectedProject: null, // current project (by id)
  error: null,
  message: null,
};

/* ------------------------------------------------- */
/*  Slice                                            */
/* ------------------------------------------------- */
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProjectState: () => initialState,
  },
  extraReducers: (builder) => {
    /* ---------- create ---------- */
    builder
      .addCase(createProject.pending, (s) => {
        s.creating = true;
        s.error = null;
      })
      .addCase(createProject.fulfilled, (s, a) => {
        s.creating = false;
        s.projects.unshift(a.payload.data.project);
        s.message = a.payload.message || "Project created successfully";
      })
      .addCase(createProject.rejected, (s, a) => {
        s.creating = false;
        s.error = a.payload;
      });

    builder
      .addCase(getProjects.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(getProjects.fulfilled, (s, a) => {
        s.loading = false;
        s.projects = a.payload.data || []; // adjust to API shape
        s.message = a.payload.message || null;
      })
      .addCase(getProjects.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        s.projects = [];
      });

    /* ---------- get by id ---------- */
    builder
      .addCase(getProjectById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(getProjectById.fulfilled, (s, a) => {
        s.loading = false;
        s.selectedProject = a.payload.data.project;
      })
      .addCase(getProjectById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        s.selectedProject = null;
      });

    /* ---------- update ---------- */
    builder
      .addCase(updateProject.pending, (s) => {
        s.updating = true;
        s.error = null;
      })
      .addCase(updateProject.fulfilled, (s, a) => {
        s.updating = false;
        const updated = a.payload.data.project;
        s.selectedProject = updated;
        const idx = s.projects.findIndex((p) => p._id === updated._id);
        if (idx !== -1) s.projects[idx] = updated;
        s.message = a.payload.message || "Project updated successfully";
      })
      .addCase(updateProject.rejected, (s, a) => {
        s.updating = false;
        s.error = a.payload;
      });

    /* ---------- delete ---------- */
    builder
      .addCase(deleteProject.pending, (s) => {
        s.deleting = true;
        s.error = null;
      })
      .addCase(deleteProject.fulfilled, (s, a) => {
        s.deleting = false;
        s.projects = s.projects.filter((p) => p._id !== a.payload.deletedId);
        if (s.selectedProject?._id === a.payload.deletedId)
          s.selectedProject = null;
        s.message = a.payload.message || "Project deleted successfully";
      })
      .addCase(deleteProject.rejected, (s, a) => {
        s.deleting = false;
        s.error = a.payload;
      });

    /* ---------- toggle visibility ---------- */
    builder
      .addCase(toggleProjectVisibility.pending, (s) => {
        s.toggling = true;
      })
      .addCase(toggleProjectVisibility.fulfilled, (s, a) => {
        s.toggling = false;
        const proj = s.projects.find((p) => p._id === a.payload.projectId);
        if (proj) proj.isShown = a.payload.data.isShown;
        if (s.selectedProject?._id === a.payload.projectId)
          s.selectedProject.isShown = a.payload.data.isShown;
      })
      .addCase(toggleProjectVisibility.rejected, (s) => {
        s.toggling = false;
      });

    /* ---------- members ---------- */
    builder
      .addCase(addMemberToProject.fulfilled, (s, a) => {
        const { projectId, data } = a.payload;
        const proj = s.projects.find((p) => p._id === projectId);
        if (proj) proj.members = data.members;
        if (s.selectedProject?._id === projectId)
          s.selectedProject.members = data.members;
      })
      .addCase(removeMemberFromProject.fulfilled, (s, a) => {
        const { projectId, data } = a.payload;
        const proj = s.projects.find((p) => p._id === projectId);
        if (proj) proj.members = data.members;
        if (s.selectedProject?._id === projectId)
          s.selectedProject.members = data.members;
      });

    /* ---------- features ---------- */
    builder
      .addCase(assignFeatureToProject.fulfilled, (s, a) => {
        const { projectId, data } = a.payload;
        const proj = s.projects.find((p) => p._id === projectId);
        if (proj) proj.features = data.features;
        if (s.selectedProject?._id === projectId)
          s.selectedProject.features = data.features;
      })
      .addCase(unassignFeatureFromProject.fulfilled, (s, a) => {
        const { projectId, data } = a.payload;
        const proj = s.projects.find((p) => p._id === projectId);
        if (proj) proj.features = data.features;
        if (s.selectedProject?._id === projectId)
          s.selectedProject.features = data.features;
      });
  },
});

/* ------------------------------------------------- */
/*  Actions & Selectors                              */
/* ------------------------------------------------- */
export const { clearMessages, clearError, resetProjectState } =
  projectSlice.actions;

/* basic selectors */
export const selectProjects = (s) => s.project.projects;
export const selectSelectedProject = (s) => s.project.selectedProject;
export const selectProjectLoading = (s) => s.project.loading;
export const selectProjectCreating = (s) => s.project.creating;
export const selectProjectUpdating = (s) => s.project.updating;
export const selectProjectDeleting = (s) => s.project.deleting;
export const selectProjectError = (s) => s.project.error;
export const selectProjectMessage = (s) => s.project.message;

export default projectSlice.reducer;
