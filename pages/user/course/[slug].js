/** @format */

import { createElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Avatar, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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

  const router = useRouter();
  const { slug } = router.query;

  const loadCourse = async () => {
    const { data } = await axios(`/api/user/course/${slug}`);
    setCourse(data);
  };

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

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
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div className="col">
          {clicked !== -1 ? (
            <>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <div className="wrapper">
                    <ReactPlayer
                      className="player"
                      url={course.lessons[clicked].video.Location}
                      width="100%"
                      height="100%"
                      controls
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
