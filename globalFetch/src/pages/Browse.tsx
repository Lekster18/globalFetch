import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import useFetch from "../hooks/useFetch";

interface BrowseProps {
  name: string;
}

interface RequestData {
  id: number;
  date: string;
  price: number;
  description: string;
  country: string;
  city: string;
}

interface TripData {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  user_name: string;
}

const BrowseDisplay: React.FC<BrowseProps> = (props) => {
  const [request, setRequest] = useState<RequestData[]>([]);
  const [trip, setTrip] = useState<TripData[]>([]);
  const fetchData = useFetch();

  const getRequest = async () => {
    const res = await fetchData("/api/request", "GET", undefined);

    if (res.ok) {
      setRequest(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getTrip = async () => {
    const res = await fetchData("/api/trip", "GET", undefined);

    if (res.ok) {
      setTrip(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // const addToTransaction = async() => {
  //   const res = await fetchData("/api/transaction", "POST", {

  //   })
  // }

  //need to add more parameters so that it aligns with table
  // const addTransactionRequest = async (buyer_name: string, seller_name:string,) => {
  // //use trip id go back to trip table to get seller user id
  //   const res = await fetchData("/api/transaction", "POST", {

  //     buyer_name,
  //     seller_name:
  //   });
  // };

  useEffect(() => {
    getRequest();
    getTrip();
  }, []);

  return (
    <Row gutter={16}>
      {trip.map((item) => (
        <Col span={8} key={item.id}>
          <Card title={`${item.country} - ${item.city}`} bordered={false}>
            <p>Start Date: {item.start_date}</p>
            <p>End Date: {item.end_date}</p>
            <p>Name: {item.user_name}</p>
            <button>Make request!</button>
            {/* onClick={() => addTransactionRequest(props.name) */}
          </Card>
        </Col>
      ))}
      {request.map((item) => (
        <Col span={8} key={item.id}>
          <Card title={`${item.country} - ${item.city}`} bordered={false}>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Collection Date: {item.date}</p>
            <button>I will help you buy it!</button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BrowseDisplay;
