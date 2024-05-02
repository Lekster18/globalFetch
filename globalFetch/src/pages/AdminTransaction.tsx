import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "antd";
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
];

const TransactionAdmin: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("pending");
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);
  const [approvedTransactions, setApprovedTransactions] = useState<any[]>([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const fetchPendingTransactionsAll = async () => {
    const res = await fetchData(
      "/api/transaction/",
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
    fetchPendingTransactionsAll();
  }, []);

  const approveTransaction = async (id: number) => {
    const res = await fetchData(
      "/api/transaction/" + id,
      "PUT",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      const updatedPendingTransactions = pendingTransactions.filter(
        (transaction) => transaction.id !== id
      );
      setPendingTransactions(updatedPendingTransactions);
      setApprovedTransactions([...approvedTransactions, res.data]);
      console.log(approvedTransactions);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

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
        {activeTabKey2 === "pending" &&
          pendingTransactions.map((item) => (
            <div key={item.id}>
              <p>
                {item.seller_name} offered to buy item for {item.buyer_name}
              </p>
              <Button onClick={() => approveTransaction(item.id)}>
                Approve
              </Button>
              <br />
              <br />
            </div>
          ))}
        {activeTabKey2 === "approved" &&
          approvedTransactions.map((item) => (
            <div key={item.id}>
              <p>
                {item.seller_name} offered to buy item for {item.buyer_name}
              </p>
              <br />
              <br />
            </div>
          ))}
      </Card>
    </>
  );
};

export default TransactionAdmin;
