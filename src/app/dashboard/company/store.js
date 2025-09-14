import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CompanySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    companies: [],
    companiesName:[],
    selectedCompany: null,
    message: "",
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companiesName = action.payload;
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
  setCompanies,
  setSelectedCompany,
  setMessage,
  setError,
  setCompanyName
} = CompanySlice.actions;



export const createCompany = (companyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_COMPANY_SERVER_URL}/company`,
      companyData,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage); // THROW so that it can be caught in the component
  } finally {
    dispatch(setLoading(false));
  }
};


// Get All Companies
export const fetchCompanies = (page = 1, limit = 5) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // const response = await axios.get(`/api/company?page=${page}&limit=${limit}`);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPANY_SERVER_URL}/company?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
    dispatch(setCompanies(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get Company by ID
export const getCompanyById = (companyId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.COMPANY_SERVER_URL}/company/${companyId}`,
      { withCredentials: true }
    );
    dispatch(setSelectedCompany(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Company
export const updateCompany = (companyId, companyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_COMPANY_SERVER_URL}/company/${companyId}`,
      companyData,
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

// Delete Company
export const deleteCompany = (companyId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(
      `${process.env.COMPANY_SERVER_URL}/company/${companyId}`,
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


export const updateCompanyLogo = (companyId, logoFile) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const formData = new FormData();
    formData.append("logo", logoFile);

    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_COMPANY_SERVER_URL}/company/update-company-logo/${companyId}`,
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


export const fetchCompaniesName = (page = 1, limit = 5) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // const response = await axios.get(`/api/company?page=${page}&limit=${limit}`);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPANY_SERVER_URL}/company/get-company-name`,
      { withCredentials: true }
    );
    dispatch(setCompanyName(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export default CompanySlice.reducer;
