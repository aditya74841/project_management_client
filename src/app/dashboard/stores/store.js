import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const StoreSlice = createSlice({
  name: "store",
  initialState: {
    loading: false,
    stores: [],
    storesName: [],
    totalStores:0,
    selectedStore: null,
    message: "",
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setStoreName: (state, action) => {
      state.storesName = action.payload;
    },
    setStoreCount: (state, action) => {
      state.totalStores = action.payload;
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
  setStores,
  setSelectedStore,
  setMessage,
  setError,
  setStoreName,
  setStoreCount
} = StoreSlice.actions;

// Create Store
export const createStore = (storeData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.SERVER_URL}/store`,
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

// Update Store
export const updateStore = (storeId, storeData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.patch(
      `${process.env.SERVER_URL}/store/${storeId}`,
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

// Fetch all stores
export const fetchStores =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${process.env.SERVER_URL}/store?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      dispatch(setStores(data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
      `${process.env.SERVER_URL}/store/${storeId}`,
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
export const getStoresBasedOnCompany =
  (companyId, page = 1, limit = 5) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${process.env.SERVER_URL}/store/get-store-based-on-company?page=${page}&limit=${limit}`,
        { companyId },
        { withCredentials: true }
      );
      // console.log("The count of the stores is ", data.data);
      dispatch(setStoreCount(data.data.totalStores))
      dispatch(setStores(data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchStoreName = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/store/getStoreName`,
      { withCredentials: true }
    );
    // console.log("the Store Name Data is ", data.data);

    dispatch(setStoreName(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default StoreSlice.reducer;
