"use client";

import { useEffect } from "react";
import { notification, message as Message } from "antd";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearAlert } from "@/store/slice/alert.slice";

const GlobalAlert = () => {
  const dispatch = useAppDispatch();
  const { type, message, title } = useAppSelector((state) => state.alert);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!type || !message) return;

    if (type === "loading") {
      Message.loading(message, 1.5);
      dispatch(clearAlert());
      return;
    }

    api[type]({
      title,
      description: message,
      placement: "topRight",
      duration: 2,
    });

    dispatch(clearAlert());
  }, [type, message, api, dispatch]);

  return <>{contextHolder}</>;
};

export default GlobalAlert;
