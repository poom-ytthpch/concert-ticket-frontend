"use client";

import { Menu } from "antd";
import { HomeOutlined, InboxOutlined, SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { switchUser } from "@/store/slice/auth.slice";

const MenuList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

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

  const isUserAdmin = useMemo(() => {
    if (!auth.user) return false;
    return (
      auth.user.roles.includes("USER") && auth.user.roles.includes("ADMIN")
    );
  }, [auth.user]);

  const handleClick = (e: { key: string }) => {
    if (e.key === "home") {
      router.push(`/`);
      return;
    }
    if (e.key === "switch_to_user" || e.key === "switch_to_admin") {
      dispatch(switchUser());
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
        } else if (item.key === "history" && !auth.user?.isAdmin || item.key === "home" && !auth.user?.isAdmin) {
          return null;
        } else {
          return item;
        }
      })}
    />
  );
};

export default MenuList;
