// redux/slices/projectDiarySlice.js
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
/*  Async thunks - Core CRUD                         */
/* ------------------------------------------------- */

export const createProjectDiary = createAsyncThunk(
    "projectDiary/create",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post("/project-diaries", payload, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to create project diary";
            return rejectWithValue(msg);
        }
    }
);

export const getAllProjectDiaries = createAsyncThunk(
    "projectDiary/getAll",
    async (params = {}, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.get("/project-diaries", { headers, params });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch project diaries";
            return rejectWithValue(msg);
        }
    }
);

export const getProjectDiaryById = createAsyncThunk(
    "projectDiary/getById",
    async (diaryId, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.get(`/project-diaries/${diaryId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch project diary";
            return rejectWithValue(msg);
        }
    }
);

export const getOrCreateDiaryForProject = createAsyncThunk(
    "projectDiary/getOrCreateForProject",
    async (projectId, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.get(`/project-diaries/project/${projectId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch or create diary for project";
            return rejectWithValue(msg);
        }
    }
);

export const deleteProjectDiary = createAsyncThunk(
    "projectDiary/delete",
    async (diaryId, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}`, { headers });
            return { ...res.data, deletedId: diaryId };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to delete project diary";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Status & Priority                 */
/* ------------------------------------------------- */

export const updateDiaryStatus = createAsyncThunk(
    "projectDiary/updateStatus",
    async ({ diaryId, status }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/status`, { status }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update status";
            return rejectWithValue(msg);
        }
    }
);

export const updateDiaryPriority = createAsyncThunk(
    "projectDiary/updatePriority",
    async ({ diaryId, priority }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/priority`, { priority }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update priority";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Questions                         */
/* ------------------------------------------------- */

export const addQuestion = createAsyncThunk(
    "projectDiary/addQuestion",
    async ({ diaryId, name, answer }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/questions`, { name, answer }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add question";
            return rejectWithValue(msg);
        }
    }
);

export const removeQuestion = createAsyncThunk(
    "projectDiary/removeQuestion",
    async ({ diaryId, questionId }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/questions/${questionId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove question";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - User Flows                        */
/* ------------------------------------------------- */

export const addUserFlow = createAsyncThunk(
    "projectDiary/addUserFlow",
    async ({ diaryId, flow }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/user-flows`, { flow }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add user flow";
            return rejectWithValue(msg);
        }
    }
);

export const removeUserFlow = createAsyncThunk(
    "projectDiary/removeUserFlow",
    async ({ diaryId, flowId }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/user-flows/${flowId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove user flow";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Features                          */
/* ------------------------------------------------- */

export const addFeature = createAsyncThunk(
    "projectDiary/addFeature",
    async ({ diaryId, name, description, priority, status }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/features`, { name, description, priority, status }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add feature";
            return rejectWithValue(msg);
        }
    }
);

export const removeFeature = createAsyncThunk(
    "projectDiary/removeFeature",
    async ({ diaryId, featureId }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/features/${featureId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove feature";
            return rejectWithValue(msg);
        }
    }
);

export const updateFeatureDetails = createAsyncThunk(
    "projectDiary/updateFeatureDetails",
    async ({ diaryId, featureId, name, description }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/details`, { name, description }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update feature details";
            return rejectWithValue(msg);
        }
    }
);

export const updateFeaturePriority = createAsyncThunk(
    "projectDiary/updateFeaturePriority",
    async ({ diaryId, featureId, priority }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/priority`, { priority }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update feature priority";
            return rejectWithValue(msg);
        }
    }
);

export const updateFeatureStatus = createAsyncThunk(
    "projectDiary/updateFeatureStatus",
    async ({ diaryId, featureId, status }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/status`, { status }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update feature status";
            return rejectWithValue(msg);
        }
    }
);

export const toggleFeatureCompletion = createAsyncThunk(
    "projectDiary/toggleFeatureCompletion",
    async ({ diaryId, featureId }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/toggle`, {}, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to toggle feature completion";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Tags                              */
/* ------------------------------------------------- */

export const addTag = createAsyncThunk(
    "projectDiary/addTag",
    async ({ diaryId, tag }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/tags`, { tag }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add tag";
            return rejectWithValue(msg);
        }
    }
);

export const removeTag = createAsyncThunk(
    "projectDiary/removeTag",
    async ({ diaryId, tag }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/tags/${encodeURIComponent(tag)}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove tag";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Reference Links                   */
/* ------------------------------------------------- */

export const addReferenceLink = createAsyncThunk(
    "projectDiary/addReferenceLink",
    async ({ diaryId, name, url }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/links`, { name, url }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add reference link";
            return rejectWithValue(msg);
        }
    }
);

export const removeReferenceLink = createAsyncThunk(
    "projectDiary/removeReferenceLink",
    async ({ diaryId, linkId }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/links/${linkId}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove reference link";
            return rejectWithValue(msg);
        }
    }
);

/* ------------------------------------------------- */
/*  Async thunks - Tech Stack                        */
/* ------------------------------------------------- */

export const addTechStack = createAsyncThunk(
    "projectDiary/addTechStack",
    async ({ diaryId, tech }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.post(`/project-diaries/${diaryId}/tech-stack`, { tech }, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add tech stack";
            return rejectWithValue(msg);
        }
    }
);

export const removeTechStack = createAsyncThunk(
    "projectDiary/removeTechStack",
    async ({ diaryId, tech }, { rejectWithValue, getState }) => {
        try {
            const headers = getAuthHeaders(getState);
            const res = await api.delete(`/project-diaries/${diaryId}/tech-stack/${encodeURIComponent(tech)}`, { headers });
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to remove tech stack";
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
    diaries: [],
    selectedDiary: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0,
    },
    error: null,
    message: null,
};

/* ------------------------------------------------- */
/*  Slice                                            */
/* ------------------------------------------------- */
const projectDiarySlice = createSlice({
    name: "projectDiary",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetProjectDiaryState: () => initialState,
        setSelectedDiary: (state, action) => {
            state.selectedDiary = action.payload;
        },
    },
    extraReducers: (builder) => {
        /* ---------- create ---------- */
        builder
            .addCase(createProjectDiary.pending, (s) => {
                s.creating = true;
                s.error = null;
            })
            .addCase(createProjectDiary.fulfilled, (s, a) => {
                s.creating = false;
                s.diaries.unshift(a.payload.data.projectDiary);
                s.message = a.payload.message || "Project diary created successfully";
            })
            .addCase(createProjectDiary.rejected, (s, a) => {
                s.creating = false;
                s.error = a.payload;
            });

        /* ---------- get all ---------- */
        builder
            .addCase(getAllProjectDiaries.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(getAllProjectDiaries.fulfilled, (s, a) => {
                s.loading = false;
                s.diaries = a.payload.data.projectDiaries || [];
                s.pagination = a.payload.data.pagination || initialState.pagination;
                s.message = a.payload.message || null;
            })
            .addCase(getAllProjectDiaries.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
                s.diaries = [];
            });

        /* ---------- get by id ---------- */
        builder
            .addCase(getProjectDiaryById.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(getProjectDiaryById.fulfilled, (s, a) => {
                s.loading = false;
                s.selectedDiary = a.payload.data.projectDiary;
            })
            .addCase(getProjectDiaryById.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
                s.selectedDiary = null;
            });

        /* ---------- get or create by project id ---------- */
        builder
            .addCase(getOrCreateDiaryForProject.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(getOrCreateDiaryForProject.fulfilled, (s, a) => {
                s.loading = false;
                s.selectedDiary = a.payload.data.projectDiary;
            })
            .addCase(getOrCreateDiaryForProject.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            });

        /* ---------- delete ---------- */
        builder
            .addCase(deleteProjectDiary.pending, (s) => {
                s.deleting = true;
                s.error = null;
            })
            .addCase(deleteProjectDiary.fulfilled, (s, a) => {
                s.deleting = false;
                s.diaries = s.diaries.filter((d) => d._id !== a.payload.deletedId);
                if (s.selectedDiary?._id === a.payload.deletedId) s.selectedDiary = null;
                s.message = a.payload.message || "Project diary deleted successfully";
            })
            .addCase(deleteProjectDiary.rejected, (s, a) => {
                s.deleting = false;
                s.error = a.payload;
            });

        /* ---------- update status ---------- */
        builder.addCase(updateDiaryStatus.fulfilled, (s, a) => {
            const updated = a.payload.data.projectDiary;
            s.selectedDiary = updated;
            const idx = s.diaries.findIndex((d) => d._id === updated._id);
            if (idx !== -1) s.diaries[idx] = updated;
            s.message = a.payload.message || "Status updated successfully";
        });

        /* ---------- update priority ---------- */
        builder.addCase(updateDiaryPriority.fulfilled, (s, a) => {
            const updated = a.payload.data.projectDiary;
            s.selectedDiary = updated;
            const idx = s.diaries.findIndex((d) => d._id === updated._id);
            if (idx !== -1) s.diaries[idx] = updated;
            s.message = a.payload.message || "Priority updated successfully";
        });

        /* ---------- questions ---------- */
        builder
            .addCase(addQuestion.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeQuestion.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });

        /* ---------- user flows ---------- */
        builder
            .addCase(addUserFlow.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeUserFlow.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });

        /* ---------- features ---------- */
        builder
            .addCase(addFeature.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeFeature.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(updateFeatureDetails.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(updateFeaturePriority.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(updateFeatureStatus.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(toggleFeatureCompletion.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });

        /* ---------- tags ---------- */
        builder
            .addCase(addTag.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeTag.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });

        /* ---------- reference links ---------- */
        builder
            .addCase(addReferenceLink.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeReferenceLink.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });

        /* ---------- tech stack ---------- */
        builder
            .addCase(addTechStack.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            })
            .addCase(removeTechStack.fulfilled, (s, a) => {
                const updated = a.payload.data.projectDiary;
                s.selectedDiary = updated;
                const idx = s.diaries.findIndex((d) => d._id === updated._id);
                if (idx !== -1) s.diaries[idx] = updated;
            });
    },
});

/* ------------------------------------------------- */
/*  Actions & Selectors                              */
/* ------------------------------------------------- */
export const { clearMessages, clearError, resetProjectDiaryState, setSelectedDiary } =
    projectDiarySlice.actions;

export { getOrCreateDiaryForProject }; // Exporting the new thunk here if needed, but it's already exported at definition

/* basic selectors */
export const selectDiaries = (s) => s.projectDiary.diaries;
export const selectSelectedDiary = (s) => s.projectDiary.selectedDiary;
export const selectPagination = (s) => s.projectDiary.pagination;
export const selectDiaryLoading = (s) => s.projectDiary.loading;
export const selectDiaryCreating = (s) => s.projectDiary.creating;
export const selectDiaryUpdating = (s) => s.projectDiary.updating;
export const selectDiaryDeleting = (s) => s.projectDiary.deleting;
export const selectDiaryError = (s) => s.projectDiary.error;
export const selectDiaryMessage = (s) => s.projectDiary.message;

export default projectDiarySlice.reducer;
