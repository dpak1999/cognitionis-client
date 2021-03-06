/** @format */

import { useEffect } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserRoute from '../../../components/routes/UserRoutes';

const StripeSuccess = () => {
  const router = useRouter();
  const { id } = router.query;

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    console.log(data);
    router.push(`/user/course/${data.course.slug}`);
  };

  useEffect(() => {
    if (id) {
      successRequest();
    }
  }, [id]);

  return (
    <UserRoute showNav={false}>
      <div className="row text-center">
        <div className="col-12 pb-5">
          <div className="d-flex justify-content-center p-5">
            <SyncOutlined spin className="display-1 text-danger p-5" />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default StripeSuccess;
