import React, { useContext, useEffect, useRef, useState } from "react";
import Trip from "./Trip";
// import { addTrip, getTrip, AddTripReq } from "../hooks/api";
import UserContext from "../context/user";
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
  const [trips, setTrips] = useState<TripData[]>([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  // const addTripReq: AddTripReq = {
  //   country: countryRef.current?.value ?? "",
  //   city: cityRef.current?.value ?? "",
  //   start_date: start_dateRef?.current?.value ?? "",
  //   end_date: end_dateRef?.current?.value ?? "",
  //   user_name: userCtx.name,
  // };

  const getUserTrip = async () => {
    const res = await fetchData(
      "/api/trip/" + userCtx.name,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data);
      setTrips(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addTrip = async () => {
    const res = await fetchData(
      "/api/trip",
      "POST",
      {
        country: countryRef.current!.value,
        city: cityRef.current!.value,
        start_date: start_dateRef.current!.value,
        end_date: end_dateRef.current!.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getUserTrip();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteTrip = async (id: number) => {
    const res = await fetchData(
      "/api/trip/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getUserTrip();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // const refreshTrips = async (): Promise<void> => {
  //   const res = await getTrip();
  //   if (res.ok) {
  //     setTrips(res.data);
  //   }
  // };

  useEffect(() => {
    getUserTrip();
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
          type="date"
          ref={start_dateRef}
          placeholder="Start Date"
          className="col-md-1"
        />
        <input
          type="date"
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

      {trips.map((item) => (
        <Trip
          id={item.id}
          country={item.country}
          city={item.city}
          start_date={item.start_date}
          end_date={item.end_date}
          // refreshTrips={refreshTrips}
          getUserTrip={getUserTrip}
          deleteTrip={deleteTrip}
        />
      ))}
    </div>
  );
};

export default TripDisplay;
