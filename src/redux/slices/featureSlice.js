// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.SERVER_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   timeout: 10000,
// });

// const getAuthHeaders = (getState) => {
//   const { auth } = getState();
//   const token = auth.accessToken;
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // Create Feature
// export const createFeature = createAsyncThunk(
//   "feature/create",
//   async (payload, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.post("/features", payload, { headers });
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to create feature";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Get Features by Project ID
// export const getFeaturesByProjectId = createAsyncThunk(
//   "feature/getByProjectId",
//   async (projectId, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.get(`/features/project/${projectId}`, { headers });
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to fetch features";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Get Feature by ID
// export const getFeatureById = createAsyncThunk(
//   "feature/getById",
//   async (featureId, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.get(`/features/${featureId}`, { headers });
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to fetch feature";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Update Feature
// export const updateFeature = createAsyncThunk(
//   "feature/update",
//   async ({ featureId, ...payload }, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.patch(`/features/${featureId}`, payload, { headers });
//       return res.data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to update feature";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Delete Feature
// export const deleteFeature = createAsyncThunk(
//   "feature/delete",
//   async (featureId, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.delete(`/features/${featureId}`, { headers });
//       return { ...res.data, deletedId: featureId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to delete feature";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Assign Users to Feature
// export const assignUsersToFeature = createAsyncThunk(
//   "feature/assignUsers",
//   async ({ featureId, userIds }, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.post(`/features/${featureId}/assign-users`, { userIds }, { headers });
//       return { ...res.data, featureId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to assign users";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Remove User from Feature
// export const removeUserFromFeature = createAsyncThunk(
//   "feature/removeUser",
//   async ({ featureId, userId }, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.post(`/features/${featureId}/remove-user`, { userId }, { headers });
//       return { ...res.data, featureId, userId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to remove user";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Add Comment to Feature
// export const addCommentToFeature = createAsyncThunk(
//   "feature/addComment",
//   async ({ featureId, text }, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.post(`/features/${featureId}/add-comment`, { text }, { headers });
//       return { ...res.data, featureId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to add comment";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Remove Comment from Feature
// export const removeCommentFromFeature = createAsyncThunk(
//   "feature/removeComment",
//   async ({ featureId, commentId }, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.delete(`/features/${featureId}/comments/${commentId}`, { headers });
//       return { ...res.data, featureId, commentId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to remove comment";
//       return rejectWithValue(message);
//     }
//   }
// );

// // Toggle Feature Completion
// export const toggleFeatureCompletion = createAsyncThunk(
//   "feature/toggleCompletion",
//   async (featureId, { rejectWithValue, getState }) => {
//     try {
//       const headers = getAuthHeaders(getState);
//       const res = await api.patch(`/features/${featureId}/toggle-completion`, {}, { headers });
//       return { ...res.data, featureId };
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || "Failed to toggle completion";
//       return rejectWithValue(message);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   creating: false,
//   updating: false,
//   deleting: false,
//   assigningUsers: false,
//   removingUser: false,
//   addingComment: false,
//   removingComment: false,
//   togglingCompletion: false,
//   features: [],
//   selectedFeature: null,
//   selectedProjectId: null,
//   error: null,
//   message: null,
// };

// const featureSlice = createSlice({
//   name: "feature",
//   initialState,
//   reducers: {
//     clearMessages: (state) => {
//       state.error = null;
//       state.message = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setSelectedProjectId: (state, action) => {
//       state.selectedProjectId = action.payload;
//     },
//     setSelectedFeature: (state, action) => {
//       state.selectedFeature = action.payload;
//     },
//     resetFeatureState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     // Create Feature
//     builder
//       .addCase(createFeature.pending, (state) => {
//         state.creating = true;
//         state.error = null;
//       })
//       .addCase(createFeature.fulfilled, (state, action) => {
//         state.creating = false;
//         state.features.unshift(action.payload.data.feature);
//         state.message = action.payload.message || "Feature created successfully";
//       })
//       .addCase(createFeature.rejected, (state, action) => {
//         state.creating = false;
//         state.error = action.payload;
//       });

//     // Get Features by Project ID
//     builder
//       .addCase(getFeaturesByProjectId.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getFeaturesByProjectId.fulfilled, (state, action) => {
//         state.loading = false;
//         state.features = action.payload.data.features || [];
//       })
//       .addCase(getFeaturesByProjectId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.features = [];
//       });

//     // Get Feature by ID
//     builder
//       .addCase(getFeatureById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getFeatureById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedFeature = action.payload.data.feature;
//       })
//       .addCase(getFeatureById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.selectedFeature = null;
//       });

//     // Update Feature
//     builder
//       .addCase(updateFeature.pending, (state) => {
//         state.updating = true;
//         state.error = null;
//       })
//       .addCase(updateFeature.fulfilled, (state, action) => {
//         state.updating = false;
//         const updated = action.payload.data.feature;
//         state.selectedFeature = updated;
//         const idx = state.features.findIndex((f) => f._id === updated._id);
//         if (idx !== -1) state.features[idx] = updated;
//         state.message = action.payload.message || "Feature updated successfully";
//       })
//       .addCase(updateFeature.rejected, (state, action) => {
//         state.updating = false;
//         state.error = action.payload;
//       });

//     // Delete Feature
//     builder
//       .addCase(deleteFeature.pending, (state) => {
//         state.deleting = true;
//         state.error = null;
//       })
//       .addCase(deleteFeature.fulfilled, (state, action) => {
//         state.deleting = false;
//         state.features = state.features.filter((f) => f._id !== action.payload.deletedId);
//         if (state.selectedFeature?._id === action.payload.deletedId) state.selectedFeature = null;
//         state.message = action.payload.message || "Feature deleted successfully";
//       })
//       .addCase(deleteFeature.rejected, (state, action) => {
//         state.deleting = false;
//         state.error = action.payload;
//       });

//     // Assign Users to Feature
//     builder
//       .addCase(assignUsersToFeature.pending, (state) => {
//         state.assigningUsers = true;
//         state.error = null;
//       })
//       .addCase(assignUsersToFeature.fulfilled, (state, action) => {
//         state.assigningUsers = false;
//         const { featureId, data } = action.payload;
//         const feature = state.features.find((f) => f._id === featureId);
//         if (feature) {
//           feature.assignedTo = data.assignedTo;
//         }
//         if (state.selectedFeature?._id === featureId) {
//           state.selectedFeature.assignedTo = data.assignedTo;
//         }
//         state.message = action.payload.message || "Users assigned successfully";
//       })
//       .addCase(assignUsersToFeature.rejected, (state, action) => {
//         state.assigningUsers = false;
//         state.error = action.payload;
//       });

//     // Remove User from Feature
//     builder
//       .addCase(removeUserFromFeature.pending, (state) => {
//         state.removingUser = true;
//         state.error = null;
//       })
//       .addCase(removeUserFromFeature.fulfilled, (state, action) => {
//         state.removingUser = false;
//         const { featureId, data } = action.payload;
//         const feature = state.features.find((f) => f._id === featureId);
//         if (feature) {
//           feature.assignedTo = data.assignedTo;
//         }
//         if (state.selectedFeature?._id === featureId) {
//           state.selectedFeature.assignedTo = data.assignedTo;
//         }
//         state.message = action.payload.message || "User removed successfully";
//       })
//       .addCase(removeUserFromFeature.rejected, (state, action) => {
//         state.removingUser = false;
//         state.error = action.payload;
//       });

//     // Add Comment to Feature
//     builder
//       .addCase(addCommentToFeature.pending, (state) => {
//         state.addingComment = true;
//         state.error = null;
//       })
//       .addCase(addCommentToFeature.fulfilled, (state, action) => {
//         state.addingComment = false;
//         const { featureId, data } = action.payload;
//         const feature = state.features.find((f) => f._id === featureId);
//         if (feature) {
//           feature.comments = data.comments;
//         }
//         if (state.selectedFeature?._id === featureId) {
//           state.selectedFeature.comments = data.comments;
//         }
//         state.message = action.payload.message || "Comment added successfully";
//       })
//       .addCase(addCommentToFeature.rejected, (state, action) => {
//         state.addingComment = false;
//         state.error = action.payload;
//       });

//     // Remove Comment from Feature
//     builder
//       .addCase(removeCommentFromFeature.pending, (state) => {
//         state.removingComment = true;
//         state.error = null;
//       })
//       .addCase(removeCommentFromFeature.fulfilled, (state, action) => {
//         state.removingComment = false;
//         const { featureId, data } = action.payload;
//         const feature = state.features.find((f) => f._id === featureId);
//         if (feature) {
//           feature.comments = data.comments;
//         }
//         if (state.selectedFeature?._id === featureId) {
//           state.selectedFeature.comments = data.comments;
//         }
//         state.message = action.payload.message || "Comment removed successfully";
//       })
//       .addCase(removeCommentFromFeature.rejected, (state, action) => {
//         state.removingComment = false;
//         state.error = action.payload;
//       });

//     // Toggle Feature Completion
//     builder
//       .addCase(toggleFeatureCompletion.pending, (state) => {
//         state.togglingCompletion = true;
//         state.error = null;
//       })
//       .addCase(toggleFeatureCompletion.fulfilled, (state, action) => {
//         state.togglingCompletion = false;
//         const { featureId, data } = action.payload;
//         const feature = state.features.find((f) => f._id === featureId);
//         if (feature) {
//           feature.isCompleted = data.feature.isCompleted;
//           feature.status = data.feature.status;
//         }
//         if (state.selectedFeature?._id === featureId) {
//           state.selectedFeature.isCompleted = data.feature.isCompleted;
//           state.selectedFeature.status = data.feature.status;
//         }
//         state.message = action.payload.message || "Feature completion toggled";
//       })
//       .addCase(toggleFeatureCompletion.rejected, (state, action) => {
//         state.togglingCompletion = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   clearMessages,
//   clearError,
//   setSelectedProjectId,
//   setSelectedFeature,
//   resetFeatureState,
// } = featureSlice.actions;

// // Selectors
// export const selectFeatures = (state) => state.feature.features;
// export const selectSelectedFeature = (state) => state.feature.selectedFeature;
// export const selectFeatureLoading = (state) => state.feature.loading;
// export const selectFeatureCreating = (state) => state.feature.creating;
// export const selectFeatureUpdating = (state) => state.feature.updating;
// export const selectFeatureDeleting = (state) => state.feature.deleting;
// export const selectFeatureAssigningUsers = (state) => state.feature.assigningUsers;
// export const selectFeatureRemovingUser = (state) => state.feature.removingUser;
// export const selectFeatureAddingComment = (state) => state.feature.addingComment;
// export const selectFeatureRemovingComment = (state) => state.feature.removingComment;
// export const selectFeatureTogglingCompletion = (state) => state.feature.togglingCompletion;
// export const selectFeatureError = (state) => state.feature.error;
// export const selectFeatureMessage = (state) => state.feature.message;
// export const selectSelectedProjectId = (state) => state.feature.selectedProjectId;

// export default featureSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10000,
});

const getAuthHeaders = (getState) => {
  const { auth } = getState();
  const token = auth.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get Project Names (for dropdown)
export const getProjectNames = createAsyncThunk(
  "feature/getProjectNames",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get("/features/get-project-name", { headers });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch project names";
      return rejectWithValue(message);
    }
  }
);

// Create Feature
export const createFeature = createAsyncThunk(
  "feature/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post("/features", payload, { headers });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create feature";
      return rejectWithValue(message);
    }
  }
);

// Get Features by Project ID
export const getFeaturesByProjectId = createAsyncThunk(
  "feature/getByProjectId",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/features/project/${projectId}`, { headers });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch features";
      return rejectWithValue(message);
    }
  }
);

// Get Feature by ID
export const getFeatureById = createAsyncThunk(
  "feature/getById",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/features/${featureId}`, { headers });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch feature";
      return rejectWithValue(message);
    }
  }
);

// Update Feature
export const updateFeature = createAsyncThunk(
  "feature/update",
  async ({ featureId, ...payload }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/features/${featureId}`, payload, {
        headers,
      });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update feature";
      return rejectWithValue(message);
    }
  }
);

// Delete Feature
export const deleteFeature = createAsyncThunk(
  "feature/delete",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/features/${featureId}`, { headers });
      return { ...res.data, deletedId: featureId };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete feature";
      return rejectWithValue(message);
    }
  }
);

// Assign Users to Feature
export const assignUsersToFeature = createAsyncThunk(
  "feature/assignUsers",
  async ({ featureId, userIds }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(
        `/features/${featureId}/assign-users`,
        { userIds },
        { headers }
      );
      return { ...res.data, featureId };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to assign users";
      return rejectWithValue(message);
    }
  }
);

// Remove User from Feature
export const removeUserFromFeature = createAsyncThunk(
  "feature/removeUser",
  async ({ featureId, userId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(
        `/features/${featureId}/remove-user`,
        { userId },
        { headers }
      );
      return { ...res.data, featureId, userId };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to remove user";
      return rejectWithValue(message);
    }
  }
);

// Add Comment to Feature
export const addCommentToFeature = createAsyncThunk(
  "feature/addComment",
  async ({ featureId, text }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post(
        `/features/${featureId}/add-comment`,
        { text },
        { headers }
      );
      return { ...res.data, featureId };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to add comment";
      return rejectWithValue(message);
    }
  }
);

// Remove Comment from Feature
export const removeCommentFromFeature = createAsyncThunk(
  "feature/removeComment",
  async ({ featureId, commentId }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(
        `/features/${featureId}/comments/${commentId}`,
        { headers }
      );
      return { ...res.data, featureId, commentId };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to remove comment";
      return rejectWithValue(message);
    }
  }
);

// Toggle Feature Completion
export const toggleFeatureCompletion = createAsyncThunk(
  "feature/toggleCompletion",
  async (featureId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(
        `/features/${featureId}/toggle-completion`,
        {},
        { headers }
      );
      return { ...res.data, featureId };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to toggle completion";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  assigningUsers: false,
  removingUser: false,
  addingComment: false,
  removingComment: false,
  togglingCompletion: false,
  loadingProjectNames: false,
  features: [],
  projectNames: [], // Added for project names
  selectedFeature: null,
  selectedProjectId: null,
  error: null,
  message: null,
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    resetFeatureState: () => initialState,
  },
  extraReducers: (builder) => {
    // Get Project Names
    builder
      .addCase(getProjectNames.pending, (state) => {
        state.loadingProjectNames = true;
        state.error = null;
      })
      .addCase(getProjectNames.fulfilled, (state, action) => {
        // console.log("The projects name is ", action.payload);
        state.loadingProjectNames = false;
        state.projectNames = action.payload.data || [];
      })
      .addCase(getProjectNames.rejected, (state, action) => {
        state.loadingProjectNames = false;
        state.error = action.payload;
        state.projectNames = [];
      });

    // Create Feature
    builder
      .addCase(createFeature.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createFeature.fulfilled, (state, action) => {
        state.creating = false;
        state.features.unshift(action.payload.data.feature);
        state.message =
          action.payload.message || "Feature created successfully";
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      });

    // Get Features by Project ID
    builder
      .addCase(getFeaturesByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturesByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload.data.features || [];
      })
      .addCase(getFeaturesByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.features = [];
      });

    // Get Feature by ID
    builder
      .addCase(getFeatureById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeatureById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFeature = action.payload.data.feature;
      })
      .addCase(getFeatureById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedFeature = null;
      });

    // Update Feature
    builder
      .addCase(updateFeature.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        state.updating = false;
        const updated = action.payload.data.feature;
        state.selectedFeature = updated;
        const idx = state.features.findIndex((f) => f._id === updated._id);
        if (idx !== -1) state.features[idx] = updated;
        state.message =
          action.payload.message || "Feature updated successfully";
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // Delete Feature
    builder
      .addCase(deleteFeature.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteFeature.fulfilled, (state, action) => {
        state.deleting = false;
        state.features = state.features.filter(
          (f) => f._id !== action.payload.deletedId
        );
        if (state.selectedFeature?._id === action.payload.deletedId)
          state.selectedFeature = null;
        state.message =
          action.payload.message || "Feature deleted successfully";
      })
      .addCase(deleteFeature.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });

    // Assign Users to Feature
    builder
      .addCase(assignUsersToFeature.pending, (state) => {
        state.assigningUsers = true;
        state.error = null;
      })
      .addCase(assignUsersToFeature.fulfilled, (state, action) => {
        state.assigningUsers = false;
        const { featureId, data } = action.payload;
        const feature = state.features.find((f) => f._id === featureId);
        if (feature) {
          feature.assignedTo = data.assignedTo;
        }
        if (state.selectedFeature?._id === featureId) {
          state.selectedFeature.assignedTo = data.assignedTo;
        }
        state.message = action.payload.message || "Users assigned successfully";
      })
      .addCase(assignUsersToFeature.rejected, (state, action) => {
        state.assigningUsers = false;
        state.error = action.payload;
      });

    // Remove User from Feature
    builder
      .addCase(removeUserFromFeature.pending, (state) => {
        state.removingUser = true;
        state.error = null;
      })
      .addCase(removeUserFromFeature.fulfilled, (state, action) => {
        state.removingUser = false;
        const { featureId, data } = action.payload;
        const feature = state.features.find((f) => f._id === featureId);
        if (feature) {
          feature.assignedTo = data.assignedTo;
        }
        if (state.selectedFeature?._id === featureId) {
          state.selectedFeature.assignedTo = data.assignedTo;
        }
        state.message = action.payload.message || "User removed successfully";
      })
      .addCase(removeUserFromFeature.rejected, (state, action) => {
        state.removingUser = false;
        state.error = action.payload;
      });

    // Add Comment to Feature
    builder
      .addCase(addCommentToFeature.pending, (state) => {
        state.addingComment = true;
        state.error = null;
      })
      .addCase(addCommentToFeature.fulfilled, (state, action) => {
        state.addingComment = false;
        const { featureId, data } = action.payload;
        const feature = state.features.find((f) => f._id === featureId);
        if (feature) {
          feature.comments = data.comments;
        }
        if (state.selectedFeature?._id === featureId) {
          state.selectedFeature.comments = data.comments;
        }
        state.message = action.payload.message || "Comment added successfully";
      })
      .addCase(addCommentToFeature.rejected, (state, action) => {
        state.addingComment = false;
        state.error = action.payload;
      });

    // Remove Comment from Feature
    builder
      .addCase(removeCommentFromFeature.pending, (state) => {
        state.removingComment = true;
        state.error = null;
      })
      .addCase(removeCommentFromFeature.fulfilled, (state, action) => {
        state.removingComment = false;
        const { featureId, data } = action.payload;
        const feature = state.features.find((f) => f._id === featureId);
        if (feature) {
          feature.comments = data.comments;
        }
        if (state.selectedFeature?._id === featureId) {
          state.selectedFeature.comments = data.comments;
        }
        state.message =
          action.payload.message || "Comment removed successfully";
      })
      .addCase(removeCommentFromFeature.rejected, (state, action) => {
        state.removingComment = false;
        state.error = action.payload;
      });

    // Toggle Feature Completion
    builder
      .addCase(toggleFeatureCompletion.pending, (state) => {
        state.togglingCompletion = true;
        state.error = null;
      })
      .addCase(toggleFeatureCompletion.fulfilled, (state, action) => {
        state.togglingCompletion = false;
        const { featureId, data } = action.payload;
        const feature = state.features.find((f) => f._id === featureId);
        if (feature) {
          feature.isCompleted = data.feature.isCompleted;
          feature.status = data.feature.status;
        }
        if (state.selectedFeature?._id === featureId) {
          state.selectedFeature.isCompleted = data.feature.isCompleted;
          state.selectedFeature.status = data.feature.status;
        }
        state.message = action.payload.message || "Feature completion toggled";
      })
      .addCase(toggleFeatureCompletion.rejected, (state, action) => {
        state.togglingCompletion = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearMessages,
  clearError,
  setSelectedProjectId,
  setSelectedFeature,
  resetFeatureState,
} = featureSlice.actions;

// Selectors
export const selectFeatures = (state) => state.feature.features;
export const selectProjectNames = (state) => state.feature.projectNames; // Added
export const selectSelectedFeature = (state) => state.feature.selectedFeature;
export const selectFeatureLoading = (state) => state.feature.loading;
export const selectProjectNamesLoading = (state) =>
  state.feature.loadingProjectNames; // Added
export const selectFeatureCreating = (state) => state.feature.creating;
export const selectFeatureUpdating = (state) => state.feature.updating;
export const selectFeatureDeleting = (state) => state.feature.deleting;
export const selectFeatureAssigningUsers = (state) =>
  state.feature.assigningUsers;
export const selectFeatureRemovingUser = (state) => state.feature.removingUser;
export const selectFeatureAddingComment = (state) =>
  state.feature.addingComment;
export const selectFeatureRemovingComment = (state) =>
  state.feature.removingComment;
export const selectFeatureTogglingCompletion = (state) =>
  state.feature.togglingCompletion;
export const selectFeatureError = (state) => state.feature.error;
export const selectFeatureMessage = (state) => state.feature.message;
export const selectSelectedProjectId = (state) =>
  state.feature.selectedProjectId;

export default featureSlice.reducer;
