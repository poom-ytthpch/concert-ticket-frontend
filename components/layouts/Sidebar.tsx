"use client";

import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import MenuList from "./Menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slice/auth.slice";

const { Sider } = Layout;

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      width={256}
      className="fixed left-0 top-0 h-full bg-white shadow-lg z-40 hidden md:flex flex-col"
      theme="light"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="text-lg font-bold text-black">
          {auth.user?.isAdmin ? "Admin" : "User"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <MenuList />
      </div>

      <div className="p-4  absolute bottom-0 mb-10">
        <Button
          icon={<LogoutOutlined />}
          block
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
}
