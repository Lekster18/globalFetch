import React, { useState } from "react";
import RequestUpdateModal from "./RequestUpdateModal";
import styles from "./Fav.module.css";

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

      <div className={styles.requestContainer}>
        <div className={styles.requestItem}>{props.country}</div>
        <div className={styles.requestItem}>{props.city}</div>
        <div className={styles.requestItem}>{props.description}</div>
        <div className={styles.requestItem}>{props.date}</div>
        <div className={styles.requestItem}>{props.price}</div>
        <button
          className={`${styles.requestButton} ${styles.requestItem}`}
          onClick={() => props.deleteRequest(props.id)}
        >
          Delete
        </button>
        <button
          className={`${styles.requestButton} ${styles.requestItem}`}
          onClick={() => setShowReqUpdateModal(true)}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Request;
