import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Overview",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Crate",
    children: "Content of Tab Pane 2",
  },
];

const ConcertTabs: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default ConcertTabs;
