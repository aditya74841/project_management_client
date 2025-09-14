import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const StoreSlice = createSlice({
  name: "store",
  initialState: {
    loading: false,
    staff: [],
    totalUsers: 0,
    selectedStore: null,
    message: "",
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setTotalUser: (state, action) => {
      state.totalUsers = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setSelectedStore,
  setMessage,
  setError,
  setStaff,
  setTotalUser,
} = StoreSlice.actions;

// Create Store
export const createStaff = (storeData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.SERVER_URL}/users/register-user-staff`,
      storeData,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchStaff =
  (companyId, page = 1, limit = 5) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // console.log("Sending companyId to backend:", companyId); // <- add this

      const { data } = await axios.post(
        `${process.env.SERVER_URL}/users/get-user-based-on-company?page=${page}&limit=${limit}`,
        { companyId },
        { withCredentials: true }
      );
      dispatch(setTotalUser(data.data.totalUsers));
      dispatch(setStaff(data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const assignUserRole = (userId, role) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.SERVER_URL}/users/assign-role/${userId}`,
      { role },
      { withCredentials: true }
    );
    // dispatch(updateStaffRole({ userId, role }));
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Store
export const updateStaff = (staffId, staffData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.patch(
      `${process.env.SERVER_URL}/users/update-user/${staffId}`,
      staffData,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all stores

// Get Store by ID
export const getStoreById = (storeId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_STORE_SERVER_URL}/store/${storeId}`,
      { withCredentials: true }
    );
    dispatch(setSelectedStore(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete Store
export const deleteStore = (storeId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_STORE_SERVER_URL}/store/${storeId}`,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Store Logo
export const updateStoreLogo = (storeId, logoFile) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const formData = new FormData();
    formData.append("logo", logoFile);

    const { data } = await axios.patch(
      `${process.env.SERVER_URL}/store/update-store-logo/${storeId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(setMessage(data.message));
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

// Get stores based on company
export const getStoresBasedOnCompany = (companyId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log("Sending companyId to backend:", companyId); // <- add this

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_STORE_SERVER_URL}/store/get-store-based-on-company`,
      { companyId },
      { withCredentials: true }
    );
    dispatch(setStores(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default StoreSlice.reducer;
