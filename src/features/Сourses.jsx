import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import CourseList from "../components/CourseList";
import { fetchDataCourses } from "../redux/coursesSlice";

export default function Courses() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchDataCourses());
  }, [dispatch]);

  return (
    <div className="main">
      {status !== "pending" ? <CourseList /> : <Spinner />}
    </div>
  );
}
