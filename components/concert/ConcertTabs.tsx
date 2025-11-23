import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import dynamic from "next/dynamic";

const CreateConcertForm = dynamic(() => import("./CreateConcertForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const items = (handleSetTabs: (key: string) => void): TabsProps["items"] => [
  {
    key: "1",
    label: "Overview",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Create",
    children: <CreateConcertForm handleSetTabs={handleSetTabs} />,
  },
];

const ConcertTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleSetTabs = (key: string) => {
    console.log("Switching to tab:", key);
    setActiveTab(key);
  };

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleSetTabs}
      items={items(handleSetTabs)} 
    />
  );
};

export default ConcertTabs;
