import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const { TabPane } = Tabs;

interface RequestData {
  id: number;
  date: string;
  price: string;
  description: string;
  country: string;
  city: string;
  user_name: string;
}

interface TripData {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  user_name: string;
}

const BrowseDisplay: React.FC = () => {
  const userCtx = useContext(UserContext);
  const [request, setRequest] = useState<RequestData[]>([]);
  const [trip, setTrip] = useState<TripData[]>([]);
  const [transaction, setTransaction] = useState<RequestData[]>([]);
  const fetchData = useFetch();
  const nav = useNavigate();

  const getRequest = async () => {
    const res = await fetchData(
      "/api/request",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setRequest(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getTrip = async () => {
    console.log(userCtx.accessToken);
    const res = await fetchData(
      "/api/trip",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setTrip(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addRequest = async () => {
    nav("/request");
  };

  const addTransaction = async (buyer_name: string) => {
    const res = await fetchData(
      "/api/transaction",
      "POST",
      {
        seller_name: userCtx.name,
        buyer_name: buyer_name,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setTransaction;
      alert("Transaction added!");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getRequest();
    getTrip();
  }, []);

  return (
    <>
      <h1>Browse</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Trips" key="1">
          <Row gutter={16}>
            {trip.map((item) => (
              <Col span={8} key={item.id}>
                <Card title={`${item.country} - ${item.city}`} bordered={false}>
                  <p>Start Date: {item.start_date}</p>
                  <p>End Date: {item.end_date}</p>
                  <p>Name: {item.user_name}</p>
                  <button onClick={addRequest}>Make request!</button>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Requests" key="2">
          <Row gutter={16}>
            {request.map((item) => (
              <Col span={8} key={item.id}>
                <Card title={`${item.country} - ${item.city}`} bordered={false}>
                  <p>Description: {item.description}</p>
                  <p>Price: {item.price}</p>
                  <p>Collection Date: {item.date}</p>
                  <p>Name: {item.user_name}</p>
                  <button onClick={() => addTransaction(item.user_name)}>
                    I will help you buy it!
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
};

export default BrowseDisplay;
