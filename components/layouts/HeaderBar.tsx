"use client";

import { useState } from "react";
import { Button, Drawer } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import MenuList from "./Menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slice/auth.slice";
import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white px-6 py-2 shadow-sm sticky top-0 z-50 md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-black">
            {auth.user?.isAdmin ? "Admin" : "User"}
          </span>
        </div>

        <Button
          type="text"
          icon={<MenuOutlined className="text-2xl text-gray-700" />}
          onClick={showDrawer}
          className="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
        />
      </div>

      <Drawer
        title={auth.user?.isAdmin ? "Admin" : "User"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <MenuList />
        <div className="p-4  absolute bottom-0 mb-10">
          <Button
            icon={<LogoutOutlined />}
            block
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </>
  );
}
