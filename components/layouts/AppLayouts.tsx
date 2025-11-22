"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";

import GlobalAlert from "../alert/GlobalAlert";
import ClientProviders from "../ClientProviders";
import HeaderBar from "./HeaderBar";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token]);

  return (
    <Layout className="h-screen bg-gray-50">
      <Sidebar />

      <Layout className="transition-all duration-300 ">
        <GlobalAlert />
        <HeaderBar />
        <Content className="p-6 bg-white  shadow-sm min-h-[calc(100vh-120px)] block overflow-auto">
          <ClientProviders>{children}</ClientProviders>
        </Content>
      </Layout>
    </Layout>
  );
}
