import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { List } from "antd";

import { fetchDataCourse } from "../redux/currentCourseSlice";
import CourseItem from "./CourseItem";

export default function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.data);
  const [pageNumber, setPageNumber] = useState(1);

  const onClickCourse = (currentId) => {
    dispatch(fetchDataCourse(currentId));
    navigate(`/course/${currentId}`);
  };

  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 10,
        align: "center",
        total: courses.length,
        onChange: setPageNumber,
        defaultCurrent: pageNumber,
      }}
      renderItem={(item) => (
        <CourseItem key={item.id} course={item} onClick={onClickCourse} />
      )}
    />
  );
}
