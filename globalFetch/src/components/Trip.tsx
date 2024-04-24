import React, { useState } from "react";
import UpdateModal from "./UpdateModal";

interface TripProps {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  getTrip: () => void;
  deleteTrip: (id: number) => void;
}

const Trip: React.FC<TripProps> = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          country={props.country}
          city={props.city}
          start_date={props.start_date}
          end_date={props.end_date}
          getTrip={props.getTrip}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div>
        <div className="col-sm-2">{props.country}</div>
        <div className="col-sm-2">{props.city}</div>
        <div className="col-sm-1">{props.start_date}</div>
        <div className="col-sm-2">{props.end_date}</div>
        <>
          <button
            className="col-sm-1"
            onClick={() => props.deleteTrip(props.id)}
          >
            delete
          </button>

          <button className="col-sm-1" onClick={() => setShowUpdateModal(true)}>
            update
          </button>
        </>
      </div>
    </>
  );
};

export default Trip;
