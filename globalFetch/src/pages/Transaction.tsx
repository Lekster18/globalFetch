import React, { useState, useEffect, useContext } from "react";
import { Card, Row } from "antd";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const tabListNoTitle = [
  {
    key: "Pending",
    label: "Pending",
  },
  {
    key: "Approved",
    label: "Approved",
  },
];

const Transactions: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("pending");
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);
  const [approvedTransactions, setApprovedTransactions] = useState<any[]>([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const fetchPendingTransactions = async () => {
    const res = await fetchData(
      "/api/transaction/" + userCtx.name,
      "POST",
      { status: "pending" },
      userCtx.accessToken
    );
    if (res.ok) {
      setPendingTransactions(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchApprovedTransactions = async () => {
    const res = await fetchData(
      "/api/transaction/" + userCtx.name,
      "POST",
      { status: "approved" },
      userCtx.accessToken
    );
    if (res.ok) {
      setApprovedTransactions(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchPendingTransactions(), fetchApprovedTransactions();
  }, []);

  const onTabChange = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <h1>All Transactions</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Pending" key="1">
          <Row gutter={16}>
            {pendingTransactions.map((item) => (
              <div key={item.id}>
                <p>
                  {item.buyer_name} made a request to buy {item.description}{" "}
                </p>
                <p>
                  {item.seller_name} offered to buy from {item.country}-
                  {item.city}
                </p>
                <br />
                <br />
              </div>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Approved" key="2">
          <Row gutter={16}>
            {approvedTransactions.map((item) => (
              <div key={item.id}>
                <p>
                  {item.buyer_name} made a request to buy {item.description}{" "}
                </p>
                <p>
                  {item.seller_name} offered to buy from {item.country}-
                  {item.city}
                </p>
                <br />
                <br />
              </div>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Transactions;
