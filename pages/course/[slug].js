/** @format */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import SingleCourseLesson from '../../components/cards/SingleCourseLesson';
import PreviewModal from '../../components/modals/PreviewModal';
import { Context } from '../../context';

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();
  const { slug } = router.query;

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    setEnrolled(data);
  };

  const handlePaidEnrollment = () => {};

  const handleFreeEnrollment = () => {};

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        preview={preview}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {course.lessons && (
        <SingleCourseLesson
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
