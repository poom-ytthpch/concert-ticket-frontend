"use client";

import { useAppDispatch } from "@/store/hooks";
import { activity_logs } from "@/store/slice/concert.slice";
import { MapActionType } from "@/types/concert";
import { ActivityLogGql } from "@/types/gql";
import { Table, TableProps, TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";

const HistoryTable = () => {
  const dispatch = useAppDispatch();

  const [activityLogs, setActivityLogs] = useState<ActivityLogGql[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchLogs = async (page: number, pageSize: number) => {
    setLoading(true);
    const skip = (page - 1) * pageSize;

    const res = await dispatch(activity_logs({ take: pageSize, skip }));

    console.log(res);
    const payload: any = (res as any)?.payload.data.activityLogs;

    if (payload?.data) {
      setActivityLogs(payload.data);
      setTotal(payload.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLogs(page, pageSize);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newPage = pagination.current || 1;
    const newPageSize = pagination.pageSize || 10;
    setPage(newPage);
    setPageSize(newPageSize);
    fetchLogs(newPage, newPageSize);
  };

  const columns: TableProps<ActivityLogGql>["columns"] = [
    {
      title: "Date Time",
      dataIndex: "createdAt",
      render: (_, log) => <div>{new Date(log.createdAt).toLocaleString()}</div>,
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (_, log) => <div>{log.user?.username || "-"}</div>,
    },
    {
      title: "Concert Name",
      dataIndex: "concertName",
      render: (_, log) => <div>{log.concert?.name || "-"}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, log) => (
        <div>{MapActionType[log.action as keyof typeof MapActionType]}</div>
      ),
    },
  ];

  return (
    <Table<ActivityLogGql>
      columns={columns}
      dataSource={activityLogs.map((log, index) => ({ ...log, key: index }))}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
      }}
      onChange={handleTableChange}
    />
  );
};

export default HistoryTable;
