/** @format */

import { Avatar, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InstructorRoute from '../../components/routes/InstructorRoute';
import Link from 'next/link';

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses');
    setCourses(data);
  };

  const styles = { marginTop: '-15px', fontSize: '10px' };
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Instructor Dashboard</h1>
        </div>
      </div>

      {courses &&
        courses.map((course) => (
          <>
            <div className="d-flex pt-4">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : '/def.jpg'}
              />

              <div className="flex-grow-1 ps-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="pointer"
                    >
                      <a className="mt-2 text-primary">
                        <h5 className="pt-2">{course.name}</h5>
                      </a>
                    </Link>

                    <p style={{ marginTop: '-10px' }}>
                      {course.lessons.length} Lessons
                    </p>

                    {course.lessons.length < 5 ? (
                      <p style={styles} className="text-warning">
                        At least 5 lessons are required to publish
                      </p>
                    ) : course.published ? (
                      <p style={styles} className="text-success">
                        Your course is live
                      </p>
                    ) : (
                      <p style={styles} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined className="h5 pointer text-warning" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
