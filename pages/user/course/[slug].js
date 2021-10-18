/** @format */
import { useRouter } from 'next/router';

const SingleCourse = () => {
  const router = useRouter();

  return <h1>Slug is {router.query.slug}</h1>;
};

export default SingleCourse;
