/** @format */

import { CloudSyncOutlined } from '@ant-design/icons';
import UserRoute from '../../components/routes/UserRoutes';

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <div className="row text-center">
        <div className="col">
          <CloudSyncOutlined className="text-danger p-5 display-1" />
          <p className="lead">Payment failed. Try again after sometime</p>
        </div>
      </div>
    </UserRoute>
  );
};

export default StripeCancel;
