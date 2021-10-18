/** @format */

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { PlayCircleOutlined, SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import UserRoute from '../../components/routes/UserRoutes';
import { Context } from '../../context';

const UserIndex = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoadings] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const loadCourses = async () => {
    try {
      setLoadings(true);
      const { data } = await axios.get('/api/user-courses');
      setCourses(data);
      setLoadings(false);
    } catch (err) {
      console.error(err);
      setLoadings(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <UserRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Dashboard</h1>
        </div>
      </div>

      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 p-5 text-danger"
        />
      )}

      {courses &&
        courses.map((course) => (
          <div className="media pt-2 pb-1" key={course.id}>
            <Avatar
              shape="square"
              size={80}
              src={course.image ? course.image.Location : '/def.jpg'}
            />
            <div className="media-body pl-2">
              <div className="row">
                <div className="col-md-9">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: '-10px' }}>
                    {course.lessons.length} Lessons
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: '-15px', fontSize: '12px' }}
                  >
                    By {course.instructor.name}
                  </p>
                </div>
                <div className="col">
                  <div className="col-md-3 mt-3 text-center">
                    <Link
                      href={`/user/course/${course.slug}`}
                      className="pointer"
                    >
                      <a>
                        <PlayCircleOutlined className="h2 pointer text-primary" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
