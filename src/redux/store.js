import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./coursesSlice";
import currentCourseSlice from "./currentCourseSlice";

export default configureStore({
  reducer: {
    courses: coursesSlice,
    currentCourse: currentCourseSlice,
  },
});
