import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import dynamic from "next/dynamic";
import { ConcertGql } from "@/types/gql";

const CreateConcertForm = dynamic(() => import("./CreateConcertForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ConcertList = dynamic(() => import("./ConcertList"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const items = (
  handleSetTabs: (key: string) => void,
  concerts: ConcertGql[],
  lastElementRef?: (node: HTMLDivElement | null) => void
): TabsProps["items"] => [
  {
    key: "1",
    label: "Overview",
    children: (
      <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {concerts.map((concert, index) => {
          const isLast = concerts.length - 1 === index;
          return (
            <div key={concert.id} ref={isLast ? lastElementRef : null}>
              <ConcertList concerts={[concert]} />
            </div>
          );
        })}
      </div>
    ),
  },
  {
    key: "2",
    label: "Create",
    children: <CreateConcertForm handleSetTabs={handleSetTabs} />,
  },
];

type Props = {
  concerts: ConcertGql[];
  lastElementRef?: (node: HTMLDivElement | null) => void;
};

const ConcertTabs = ({ concerts = [], lastElementRef }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleSetTabs = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleSetTabs}
      items={items(handleSetTabs, concerts, lastElementRef)}
    />
  );
};

export default ConcertTabs;
