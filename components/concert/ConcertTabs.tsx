import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import dynamic from "next/dynamic";
import ConcertList from "./ConcertList";
import { ConcertGql } from "@/types/gql";

const CreateConcertForm = dynamic(() => import("./CreateConcertForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const items = (
  handleSetTabs: (key: string) => void,
  concerts: ConcertGql[]
): TabsProps["items"] => [
  {
    key: "1",
    label: "Overview",
    children: <ConcertList concerts={concerts} />,
  },
  {
    key: "2",
    label: "Create",
    children: <CreateConcertForm handleSetTabs={handleSetTabs} />,
  },
];

type Props = {
  concerts: ConcertGql[];
};

const ConcertTabs = ({ concerts = [] }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleSetTabs = (key: string) => {
    console.log("Switching to tab:", key);
    setActiveTab(key);
  };

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleSetTabs}
      items={items(handleSetTabs, concerts)}
    />
  );
};

export default ConcertTabs;
