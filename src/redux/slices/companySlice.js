// redux/slices/companySlice.js
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

// Create Company
export const createCompany = createAsyncThunk(
  "company/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.post("/companies", payload, { headers });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to create company";
      return rejectWithValue(message);
    }
  }
);

// Get All Companies
export const getAllCompanies = createAsyncThunk(
  "company/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get("/companies", { headers });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch companies";
      return rejectWithValue(message);
    }
  }
);

// Get Company By ID
export const getCompanyById = createAsyncThunk(
  "company/getById",
  async (companyId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.get(`/companies/${companyId}`, { headers });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch company";
      return rejectWithValue(message);
    }
  }
);

// Update Company
export const updateCompany = createAsyncThunk(
  "company/update",
  async ({ companyId, ...payload }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.patch(`/companies/${companyId}`, payload, { headers });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to update company";
      return rejectWithValue(message);
    }
  }
);

// Delete Company
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (companyId, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await api.delete(`/companies/${companyId}`, { headers });
      return { ...res.data, deletedId: companyId };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to delete company";
      return rejectWithValue(message);
    }
  }
);

// ------------------- Initial State -------------------
const initialState = {
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  companies: [],
  selectedCompany: null,
  error: null,
  message: null,
  totalCompanies: 0,
};

// ------------------- Slice -------------------
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetCompanyState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Company
    builder
      .addCase(createCompany.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.creating = false;
        state.companies.unshift(action.payload?.data?.company);
        state.totalCompanies += 1;
        state.message = action.payload?.message || "Company created successfully";
        state.error = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
        state.message = null;
      });

    // Get All Companies
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload?.data?.companies || [];
        state.totalCompanies = state.companies.length;
        state.error = null;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.companies = [];
      });

    // Get Company By ID
    builder
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload?.data?.company;
        state.error = null;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedCompany = null;
      });

    // Update Company
    builder
      .addCase(updateCompany.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.updating = false;
        const updatedCompany = action.payload?.data?.company;
        
        // Update in companies array
        const index = state.companies.findIndex(
          (company) => company._id === updatedCompany._id
        );
        if (index !== -1) {
          state.companies[index] = updatedCompany;
        }
        
        // Update selected company if it matches
        if (state.selectedCompany?._id === updatedCompany._id) {
          state.selectedCompany = updatedCompany;
        }
        
        state.message = action.payload?.message || "Company updated successfully";
        state.error = null;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
        state.message = null;
      });

    // Delete Company
    builder
      .addCase(deleteCompany.pending, (state) => {
        state.deleting = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedId = action.payload.deletedId;
        
        // Remove from companies array
        state.companies = state.companies.filter(
          (company) => company._id !== deletedId
        );
        state.totalCompanies = Math.max(0, state.totalCompanies - 1);
        
        // Clear selected company if it was deleted
        if (state.selectedCompany?._id === deletedId) {
          state.selectedCompany = null;
        }
        
        state.message = action.payload?.message || "Company deleted successfully";
        state.error = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

// ------------------- Actions -------------------
export const {
  clearMessages,
  clearError,
  clearSelectedCompany,
  setLoading,
  resetCompanyState,
} = companySlice.actions;

// ------------------- Selectors -------------------
export const selectAllCompanies = (state) => state.company.companies;
export const selectSelectedCompany = (state) => state.company.selectedCompany;
export const selectCompanyLoading = (state) => state.company.loading;
export const selectCompanyCreating = (state) => state.company.creating;
export const selectCompanyUpdating = (state) => state.company.updating;
export const selectCompanyDeleting = (state) => state.company.deleting;
export const selectCompanyError = (state) => state.company.error;
export const selectCompanyMessage = (state) => state.company.message;

export default companySlice.reducer;
