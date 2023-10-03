import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourses } from "../api";

export const fetchDataCourses = createAsyncThunk(
  "courses/fetchDataCourses",
  async function (_, { rejectWithValue }) {
    const [data, error] = await fetchCourses();

    if (error) return rejectWithValue({ error: error.message });

    return data;
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDataCourses.pending]: (state) => {
      state.status = "pending";
    },
    [fetchDataCourses.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.data = action.payload.courses;
      state.error = null; // clear the previous error values
    },
    [fetchDataCourses.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
        ? action.payload.error
        : "Unknown error occurred"; // save the error to the state
    },
  },
});

export default coursesSlice.reducer;
