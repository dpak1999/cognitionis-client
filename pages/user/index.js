/** @format */

import { useContext } from "react";
import UserRoute from "../../components/routes/UserRoutes";
import { Context } from "../../context";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">
            <pre>{JSON.stringify(user, null, 4)}</pre>
          </h1>
        </div>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
