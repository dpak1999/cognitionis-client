/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };
  console.log(courses);
  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Instructor Dashboard</h1>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
