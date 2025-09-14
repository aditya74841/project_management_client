import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create the auth slice
export const ResponseSlice = createSlice({
  name: "response",
  initialState: {
    loading: false,
    responses:[],
    response: {},
    error: null,
    message: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setLoading, setResponses, setResponse, setError, setMessage } =
  ResponseSlice.actions;

// Function to fetch Audit Question options
export const fetchAuditResponse = (auditId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // console.log("the Redux audit Id is ", auditId);
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/master/audit-response/${auditId}`,
      { withCredentials: true }
    );
    // console.log("The auditResponse is ", data.data);

    dispatch(setResponse(data.data));
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};


// Function to fetch all audit responses by auditId (and optional date)
export const fetchAuditResponses = (auditId, date = null) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // If no date provided, use today's date in YYYY-MM-DD format
    if (!date) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      date = `${yyyy}-${mm}-${dd}`;
    }

    const url = `${process.env.SERVER_URL}/master/audit-response-by-date/${auditId}?date=${date}`;

    const { data } = await axios.get(url, {
      withCredentials: true,
    });

    dispatch(setResponses(data.data));
    dispatch(setMessage(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};


export default ResponseSlice.reducer;
