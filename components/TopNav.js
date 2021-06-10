/** @format */
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const TopNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

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
    </Menu>
  );
};

export default TopNav;
