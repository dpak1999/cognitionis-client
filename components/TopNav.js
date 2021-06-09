/** @format */
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item icon={<AppstoreAddOutlined />}>
        <Link href="/">
          <a>Dlearn</a>
        </Link>
      </Menu.Item>

      <Menu.Item icon={<LoginOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Menu.Item>

      <Menu.Item icon={<UsergroupAddOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
