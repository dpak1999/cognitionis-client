/** @format */

import React, { useContext, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoutes";
import { toast } from "react-toastify";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Become Instructor</h1>
        </div>
      </div>
      <div className="container">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="pt-4">
            <UserSwitchOutlined className="display-1 pb-3" />
            <br />
            <h2>Setup payment to publish courses</h2>
            <p className="lead text-warning">
              We partner with Stripe to transfer earnings to your bank account
            </p>
            <Button
              className="mb-3"
              type="primary"
              block
              shape="round"
              icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
              size="large"
              onClick={becomeInstructor}
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing.." : "Setup Payment"}
            </Button>
            <p className="lead">
              You will be redirected to Stripe for completing onboarding
              process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
