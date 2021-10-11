/** @format */
import axios from 'axios';
import { useRouter } from 'next/router';
import { Badge } from 'antd';
import ReactPlayer from 'react-player';
import { currencyFormatter } from '../../utils/helper';
import { useState } from 'react';

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  const router = useRouter();
  const { slug } = router.query;
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-8 text-light">
              <h1 className="text-light font-weight-bold">{name}</h1>
              <p className="lead">
                {description && description.substring(0, 35)} ...
              </p>
              <Badge
                count={category}
                style={{ backgroundColor: '#03a9f4' }}
                className="pb-4 me-4"
              />
              <p>Created By {instructor.name}</p>
              <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
              <h4 className="text-light">
                {paid
                  ? currencyFormatter({ amount: price, currency: 'usd' })
                  : 'Free'}
              </h4>
            </div>
            <div className="col-md-4">
              {lessons[0].video && lessons[0].video.Location ? (
                <div
                  onClick={() => {
                    setPreview(lessons[0].video.Location);
                    setShowModal(!showModal);
                  }}
                >
                  <ReactPlayer
                    className="react-player-div"
                    url={lessons[0].video.Location}
                    light={image.Location}
                    width="100%"
                    height="250px"
                  />
                </div>
              ) : (
                <>
                  <img
                    src={image.Location}
                    alt={name}
                    className="img img-fluid"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal ? course.lessons[0].video.Location : ''}
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
