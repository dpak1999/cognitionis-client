/** @format */

import { useState, useEffect, useContext } from 'react';
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import InstructorRoute from '../../components/routes/InstructorRoute';
import { stripeCurrencyFormatter } from '../../utils/helper';
import axios from 'axios';
import { toast } from 'react-toastify';

const Revenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    const { data } = await axios.get(`/api/instructor/balance`);
    setBalance(data);
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/instructor/payout-settings');
      window.location.href = data;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast('Server error. Please try again later', { type: 'error' });
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-right" />
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />
            <h4>
              Pending balance{' '}
              {balance.pending &&
                balance.pending.map((item, index) => (
                  <span key={index} className="float-right">
                    {stripeCurrencyFormatter(item)}
                  </span>
                ))}
            </h4>
            <small>Since last 48 hours</small>
            {/* <hr />
            <h4>
              Payouts
              {!loading ? (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSettings}
                />
              ) : (
                <SyncOutlined spin className="float-right pointer" />
              )}
            </h4>
            <small>
              Update your stripe account details or view previous payouts
            </small> */}
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default Revenue;
