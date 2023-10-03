import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { useParams } from "react-router-dom";

import { fetchDataCourse } from "../redux/currentCourseSlice";
import VideoPlayer from "./VideoPlayer";
import Spinner from "./Spinner";

const { Content, Sider } = Layout;
const LESSONS_LABEL = "Lessons";

export default function Course() {
  const dispatch = useDispatch();
  const { id: currentId } = useParams();
  const { data, status } = useSelector((state) => state.currentCourse);

  const { lessons = [] } = data || {};
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [toggleTrigger, setToggleTrigger] = useState(false);
  const currentLesson = lessons.find(
    (lesson) => lesson.id === selectedLessonId
  );

  useEffect(() => {
    if (!lessons.length) {
      dispatch(fetchDataCourse(currentId));
    }
  }, []);

  useEffect(() => {
    if (!currentLesson && lessons.length) {
      setSelectedLessonId(lessons[0].id);
    }
  }, [lessons, lessons.length, currentLesson]);

  if (status === "rejected") {
    return <div>Error loading course data</div>;
  }
  if (status === "pending") {
    return <Spinner />;
  }

  const isLocked = currentLesson?.status === "locked";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        onCollapse={(collapsed) => {
          setToggleTrigger(collapsed);
        }}
        width={300}
      >
        <div className="lessons-label">{LESSONS_LABEL}</div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => setSelectedLessonId(key)}
          defaultSelectedKeys={[lessons[0]?.id.toString()]}
          items={lessons.map((lesson, i) => ({
            label: (
              <div className="lesson-title">
                <span className="lesson-index">
                  {i + 1}
                  {toggleTrigger ? "" : "."}
                </span>
                <span className="lesson-text">{lesson.title}</span>
              </div>
            ),
            key: lesson.id.toString(),
          }))}
        />
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div className="content-wrapper">
            <div className="content-title">{currentLesson?.title}</div>
            {!!currentLesson &&
              (!isLocked ? (
                <VideoPlayer lesson={currentLesson} />
              ) : (
                <div>Lesson isn't available</div>
              ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
