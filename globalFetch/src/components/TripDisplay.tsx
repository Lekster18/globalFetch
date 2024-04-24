import React, { useEffect, useRef, useState } from "react";
import Trip from "./Trip";
import useFetch from "../hooks/useFetch";

interface TripData {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  deleteTrip: (id: number) => void;
}

const TripDisplay: React.FC = () => {
  const [trip, setTrip] = useState<TripData[]>([]);
  const fetchData = useFetch();

  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  const getTrip = async () => {
    const res = await fetchData("/api/trip", "GET", undefined);

    if (res.ok) {
      setTrip(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addTrip = async () => {
    const res = await fetchData("/api/trip", "POST", {
      country: countryRef.current!.value,
      city: cityRef.current!.value,
      start_date: start_dateRef.current!.value,
      end_date: end_dateRef.current!.value,
    });

    if (res.ok) {
      getTrip();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteTrip = async (id: number) => {
    const res = await fetchData("/api/trip/" + id, "DELETE", undefined);
    if (res.ok) {
      getTrip();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-md-6">Trips</h1>
      </div>

      <div className="row">
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
        <input
          type="text"
          ref={start_dateRef}
          placeholder="Start Date"
          className="col-md-1"
        />
        <input
          type="text"
          ref={end_dateRef}
          placeholder="End Date"
          className="col-md-1"
        />
        <button className="col-md-1" onClick={addTrip}>
          add
        </button>
      </div>

      <br />
      <br />

      <div className="row">
        <div className="col-md-1">Country</div>
        <div className="col-md-1">City</div>
        <div className="col-md-1">Travel period</div>
      </div>

      {trip.map((item) => (
        <Trip
          id={item.id}
          country={item.country}
          city={item.city}
          start_date={item.start_date}
          end_date={item.end_date}
          getTrip={getTrip}
          deleteTrip={deleteTrip}
        />
      ))}
    </div>
  );
};

export default TripDisplay;
