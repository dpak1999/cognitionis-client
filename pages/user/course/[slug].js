/** @format */

import { createElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Avatar, Button } from 'antd';
import {
  CheckCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleFilled,
  PlayCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import ReactPlayer from 'react-player';
import StudentRoute from '../../../components/routes/StudentRoute';

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const loadCourse = async () => {
    const { data } = await axios(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const markCompleted = async () => {
    await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });

    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markIncomplete = async () => {
    try {
      await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      const all = completedLessons;
      const idx = all.indexOf(course.lessons[clicked]._id);

      if (idx > -1) {
        all.splice(idx, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/completed-list`, {
      courseId: course._id,
    });
    if (data) {
      setCompletedLessons(data);
    }
  };

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  useEffect(() => {
    if (course) {
      loadCompletedLessons();
    }
  }, [course]);

  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
          <Button
            className="text-primary mt-1 btn-block mb-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            {!collapsed && 'Lessons'}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: '80vh', overflow: 'auto' }}
          >
            {course.lessons.map((lesson, index) => (
              <Menu.Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="float-right text-primary ml-2"
                    style={{ marginTop: '13px' }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger ml-2"
                    style={{ marginTop: '13px' }}
                  />
                )}
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="alert alert-primary square">
                <strong>
                  {course.lessons[clicked].title.substring(0, 30)}
                </strong>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span
                    className="float-right pointer"
                    onClick={markIncomplete}
                  >
                    Mark as Incomplete
                  </span>
                ) : (
                  <span className="float-right pointer" onClick={markCompleted}>
                    Mark as Complete
                  </span>
                )}
              </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <div className="wrapper">
                    <ReactPlayer
                      className="player"
                      url={course.lessons[clicked].video.Location}
                      width="100%"
                      height="100%"
                      controls
                      onEnded={() => markCompleted()}
                    />
                  </div>
                )}
              <p>{course.lessons[clicked].content}</p>
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="display-1 p-5 text-primary" />
                <p className="lead">Click on the lesson to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
