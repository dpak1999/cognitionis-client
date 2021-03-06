/** @format */

import { useEffect, useContext } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res);
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
    <SyncOutlined
      className="d-flex justify-content-center display-1 text-primary p-5"
      spin
    />
  );
};

export default StripeCallback;
