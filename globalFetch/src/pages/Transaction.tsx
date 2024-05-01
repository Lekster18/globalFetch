import React, { useState } from "react";
import { Card } from "antd";

const tabListNoTitle = [
  {
    key: "pending",
    label: "pending",
  },
  {
    key: "approved",
    label: "approved",
  },
  {
    key: "completed",
    label: "completed",
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  pending: <p>All pending transactions</p>,
  approved: <p>Al approved transactions</p>,
  completed: <p>All completed transactions</p>,
};

const Transactions: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("app");

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <h1>All Transactions</h1>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

export default Transactions;
