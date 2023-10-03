import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourse } from "../api";

export const fetchDataCourse = createAsyncThunk(
  "currentCourse/fetchDataCourse",
  async function (id, { rejectWithValue }) {
    const [data, error] = await fetchCourse(id);

    if (error) {
      return rejectWithValue({ error: error.message });
    }

    return data;
  }
);

export const courseSlice = createSlice({
  name: "currentCourse",
  initialState: {
    data: { lessons: [] },
    status: null,
    error: null,
    id: null,
  },
  reducers: {
    getId(state, action) {
      state.id = action.payload;
    },
  },
  extraReducers: {
    [fetchDataCourse.pending]: (state) => {
      state.status = "pending";
    },
    [fetchDataCourse.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.data = action.payload;
      state.error = null; // clear the previous error values
    },
    [fetchDataCourse.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
        ? action.payload.error
        : "Unknown error occurred"; // save the error to the state
    },
  },
});

export const { getId } = courseSlice.actions;
export default courseSlice.reducer;
