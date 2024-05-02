import React, { useState } from "react";
import RequestUpdateModal from "./RequestUpdateModal";

interface RequestProps {
  id: number;
  date: string;
  price: number;
  description: string;
  country: string;
  city: string;
  getUserRequest: () => void;
  deleteRequest: (id: number) => void;
}

const Request: React.FC<RequestProps> = (props) => {
  const [showReqUpdateModal, setShowReqUpdateModal] = useState<boolean>(false);

  return (
    <>
      {showReqUpdateModal && (
        <RequestUpdateModal
          id={props.id}
          date={props.date}
          description={props.description}
          price={props.price}
          country={props.country}
          city={props.city}
          getUserRequest={props.getUserRequest}
          setShowReqUpdateModal={setShowReqUpdateModal}
        />
      )}

      <div>
        <div className="col-sm-2">{props.country}</div>
        <div className="col-sm-2">{props.city}</div>
        <div className="col-sm-2">{props.description}</div>
        <div className="col-sm-1">{props.date}</div>
        <div className="col-sm-2">{props.price}</div>
        <>
          <button
            className="col-sm-1"
            onClick={() => props.deleteRequest(props.id)}
          >
            delete
          </button>

          <button
            className="col-sm-1"
            onClick={() => setShowReqUpdateModal(true)}
          >
            update
          </button>
        </>
      </div>
    </>
  );
};

export default Request;
