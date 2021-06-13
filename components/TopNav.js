/** @format */
import { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const { state, dispatch } = useContext(Context);

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

      <Menu.Item
        key="/login"
        onClick={(e) => setCurrent(e.key)}
        icon={<LoginOutlined />}
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

      <Menu.Item onClick={logout} icon={<LogoutOutlined />} className="ml-auto">
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
