import React, { useContext, useEffect, useRef, useState } from "react";
import Request from "./Request";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface RequestData {
  id: number;
  date: string;
  price: number;
  description: string;
  country: string;
  city: string;
  user_name: string;
  getUserRequest: () => void;
  deleteRequest: (id: number) => void;
}

const RequestDisplay: React.FC = () => {
  const [request, setRequest] = useState<RequestData[]>([]);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  console.log(request);

  const getUserRequest = async () => {
    const res = await fetchData(
      "/api/request/" + userCtx.name,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data);
      setRequest(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addRequest = async () => {
    const res = await fetchData(
      "/api/request",
      "POST",
      {
        description: descriptionRef.current!.value,
        price: priceRef.current!.value,
        date: dateRef.current!.value,
        country: countryRef.current!.value,
        city: cityRef.current!.value,
        user_name: userCtx.name,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getUserRequest();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteRequest = async (id: number) => {
    const res = await fetchData(
      "/api/request/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getUserRequest();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-md-6">Requests</h1>
      </div>

      <div className="row">
        <input
          type="text"
          ref={descriptionRef}
          placeholder="Enter Item Description"
          className="col-md-1"
        />
        <input
          type="text"
          ref={priceRef}
          placeholder="Price"
          className="col-md-1"
        />
        <input
          type="date"
          ref={dateRef}
          placeholder="Date of collection"
          className="col-md-1"
        />
        <input
          type="text"
          ref={countryRef}
          placeholder="Country"
          className="col-md-1"
        />
        <input
          type="text"
          ref={cityRef}
          placeholder="City"
          className="col-md-1"
        />
        <button className="col-md-1" onClick={addRequest}>
          add
        </button>
      </div>

      <br />
      <br />

      <div className="row">
        <div className="col-md-1">Item Description</div>
        <div className="col-md-1">Price</div>
        <div className="col-md-1">Country</div>
        <div className="col-md-1">City</div>
        <div className="col-md-1">Collection date</div>
      </div>

      {request.map((item) => (
        <Request
          id={item.id}
          country={item.country}
          city={item.city}
          date={item.date}
          price={item.price}
          description={item.description}
          getUserRequest={getUserRequest}
          deleteRequest={deleteRequest}
        />
      ))}
    </div>
  );
};

export default RequestDisplay;
