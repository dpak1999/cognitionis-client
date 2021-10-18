/** @format */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import StudentRoute from '../../../components/routes/StudentRoute';

const SingleCourse = () => {
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
      <h1>Slug is {router.query.slug}</h1>
    </StudentRoute>
  );
};

export default SingleCourse;
