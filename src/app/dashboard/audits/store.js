import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AuditQuestionSlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    auditQuestion: [],
    auditOptions: [],
    totalAudits:0,
    selectedCompany: null,
    message: "",
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuditQuestion: (state, action) => {
      state.auditQuestion = action.payload;
    },
    setAuditOptions: (state, action) => {
      state.auditOptions = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setAuditCount: (state, action) => {
      state.totalAudits = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setMessage,
  setError,
  setAuditQuestion,
  setCompanyName,
  setAuditOptions,
  setAuditCount
} = AuditQuestionSlice.actions;

export const createAuditName = (auditData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log("checking Data is ");
    const { data } = await axios.post(
      `${process.env.SERVER_URL}/master/create-audit-question-name`,
      auditData,
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
export const fetchAuditQuestions =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // const response = await axios.get(`/api/company?page=${page}&limit=${limit}`);
      const { data } = await axios.get(
        `${process.env.SERVER_URL}/master/get-audit-question?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      // console.log("fetchAuditQuestion", data.data);
      dispatch(setLoading(false));
      dispatch(setAuditQuestion(data.data));
      dispatch(setAuditCount(data.data.allAuditCount))
      dispatch(setAuditOptions(data.data.options));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
      dispatch(setLoading(false));
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
export const updateAuditQuestion = (auditId, auditData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.patch(
      `${process.env.SERVER_URL}/master/update-audit-question-name/${auditId}`,
      auditData,
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
export const deleteAuditQuestion = (auditId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(
      `${process.env.SERVER_URL}/master/delete-audit-question-name/${auditId}`,
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

export const createOptions =
  ({ auditId, optionsData }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // console.log("the Redux audit Id is ", auditId);
      const { data } = await axios.post(
        `${process.env.SERVER_URL}/master/create-audit-option/${auditId}`,
        optionsData,
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

export const fetchAuditOptions = (auditId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // console.log("the Redux audit Id is ", auditId);
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/master/get-audit-option/${auditId}`,
      { withCredentials: true }
    );
    // console.log("The auditOptions is ", data.data.options);

    dispatch(setAuditOptions(data.data.options));
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteAuditOptions = (auditId, optionId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(
      `${process.env.SERVER_URL}/master/delete-audit-option/${auditId}/${optionId}`,
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


export const toggleIsPublished = (auditId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/master/toggle-audit-isPublished/${auditId}`,
      { withCredentials: true }
    );
    // dispatch(setSelectedCompany(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};



export const updateAuditOptions =
  (postData, auditId, optionId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.patch(
        `${process.env.SERVER_URL}/master/update-audit-option/${auditId}/${optionId}`,
        postData,
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

export const fetchCompaniesName =
  (page = 1, limit = 5) =>
  async (dispatch) => {
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

export default AuditQuestionSlice.reducer;
