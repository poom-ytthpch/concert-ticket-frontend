"use client";

import { Menu } from "antd";
import { HomeOutlined, InboxOutlined, SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
const MenuList = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "history",
      icon: <InboxOutlined />,
      label: "History",
    },
    {
      key: "switch_to_user",
      icon: <SyncOutlined />,
      label: "Switch to User",
    },
    {
      key: "switch_to_admin",
      icon: <SyncOutlined />,
      label: "Switch to Admin",
    },
  ];

  useEffect(() => {
    const isUserAndAdmin =
      auth.user?.roles.includes("USER") && auth.user?.roles.includes("ADMIN");
    setIsUserAdmin(isUserAndAdmin ?? false);
  }, [auth.user]);
  const handleClick = (e: { key: string }) => {
    if (e.key === "home") {
      router.push(`/`);
      return;
    }
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      items={menuItems.map((item) => {
        if (
          (!isUserAdmin && item.key === "switch_to_admin") ||
          (!isUserAdmin && item.key === "switch_to_user")
        ) {
          return null;
        } else if (item.key === "switch_to_user" && !auth.user?.isAdmin) {
          return null;
        } else if (item.key === "switch_to_admin" && auth.user?.isAdmin) {
          return null;
        } else {
          return item;
        }
      })}
    />
  );
};

export default MenuList;
