/** @format */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Avatar } from 'antd';
import axios from 'axios';
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
            <>{JSON.stringify(course.lessons[clicked])}</>
          ) : (
            <>Click on a lesson to start learning</>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
