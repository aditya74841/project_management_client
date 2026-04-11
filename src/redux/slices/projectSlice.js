// redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

/* ------------------------------------------------- */
/*  Async thunks                                     */
/* ------------------------------------------------- */

/* Create project */
export const createProject = createAsyncThunk(
  "project/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/projects", payload);
      return res.data; // { data: { project }, message }
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/projects");
      return res.data; // { data: { projects, pagination, filters }, message }
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
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      return res.data; // { data: { project }, message }
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
  async ({ projectId, ...payload }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/projects/${projectId}`, payload);
      return res.data; // { data: { project }, message }
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
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/projects/${projectId}`);
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

/* Change project status */
export const changeProjectStatus = createAsyncThunk(
  "project/changeStatus",
  async ({ projectId, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/projects/${projectId}/change-status`,
        { status }
      );
      return { ...res.data, projectId };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to change project status";
      return rejectWithValue(msg);
    }
  }
);

/* Member management */
export const addMemberToProject = createAsyncThunk(
  "project/addMember",
  async ({ projectId, userId }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/projects/${projectId}/members`,
        { userId }
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
  async ({ projectId, userId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/projects/${projectId}/members`, {
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

/* ------------------------------------------------- */
/*  Initial state                                    */
/* ------------------------------------------------- */
const initialState = {
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  projects: [],
  selectedProject: null,
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
        s.projects = a.payload.data.projects || [];
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

    /* ---------- change status ---------- */
    builder
      .addCase(changeProjectStatus.fulfilled, (s, a) => {
        const { projectId, data } = a.payload;
        const proj = s.projects.find((p) => p._id === projectId);
        if (proj) proj.status = data.status;
        if (s.selectedProject?._id === projectId)
          s.selectedProject.status = data.status;
        s.message = a.payload.message || "Project status changed";
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
