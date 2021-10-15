/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import UserNav from '../nav/UserNav';

const UserRoute = ({ children, showNav = true }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user');
      if (data.ok) setOk(true);
    } catch (error) {
      setOk(false);
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center p-5 text-primary display-1"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            {showNav && (
              <div className="col-md-2">
                <UserNav />
              </div>
            )}
            <div className={showNav ? 'col-md-10' : 'col-12'}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
