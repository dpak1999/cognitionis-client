/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';
import CourseCard from '../components/cards/CourseCard';

const Index = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('/api/courses');
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Cognitionis</h1>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
