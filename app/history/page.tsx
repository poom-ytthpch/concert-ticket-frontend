"use client";
import AppLayout from "@/components/layouts/AppLayouts";
import { useAppSelector } from "@/store/hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HistoryTable = dynamic(
  () => import("../../components/history/HistoryTable"),
  {
    ssr: false,
  }
);

const HistoryPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      if (!user.isAdmin) {
        router.push("/");
      }
    }
  }, [user]);

  return (
    <AppLayout>
      <div>
        <HistoryTable />
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
