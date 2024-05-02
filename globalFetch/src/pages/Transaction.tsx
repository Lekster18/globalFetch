import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

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

const Transactions: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("pending");
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const fetchPendingTransactions = async () => {
    const res = await fetchData(
      "/api/transaction/" + userCtx.name,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setPendingTransactions(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  const onTabChange = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <h1>All Transactions</h1>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTabChange}
        tabProps={{
          size: "middle",
        }}
      >
        {pendingTransactions.map((item) => (
          <div key={item.id}>
            <p>{item.buyer_name} made a request!</p>
            <p>{item.seller_name} offered to buy</p>
          </div>
        ))}
      </Card>
    </>
  );
};

export default Transactions;
