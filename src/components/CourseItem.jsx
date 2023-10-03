import React from "react";
import { List, Rate, Tag } from "antd";

export default function CourseItem({ course, onClick }) {
  return (
    <List.Item
      key={course.title}
      extra={
        <img
          className="previewImageLink"
          src={`${course.previewImageLink}/cover.webp`}
          alt="img"
        />
      }
    >
      <List.Item.Meta
        title={<a onClick={() => onClick(course.id)}>{course.title}</a>}
        description={course.description}
      />
      <div>Amount Lessons: {course.lessonsCount}</div>
      <div>
        Rating: <Rate allowHalf defaultValue={course.rating} />
      </div>
      {course.meta.skills && (
        <div>
          Skills:
          {course.meta.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      )}
    </List.Item>
  );
}
