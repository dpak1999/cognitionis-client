/** @format */
import { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Menu.Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href="/">
          <a>Dlearn</a>
        </Link>
      </Menu.Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Menu.Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>Create course</a>
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Menu.Item>
      )}

      <div className="nav-align">
        {user === null && (
          <>
            <Menu.Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
              className="ml-auto"
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UsergroupAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Menu.Item>
          </>
        )}

        {user !== null && (
          <Menu.SubMenu title={user && user.name}>
            <Menu.ItemGroup>
              <Menu.Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/logout" onClick={logout}>
                Logout
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        )}
      </div>
    </Menu>
  );
};

export default TopNav;
