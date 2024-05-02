import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import styles from "./Fav.module.css";

interface TripProps {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  getUserTrip: () => void;
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
          getUserTrip={props.getUserTrip}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={styles.requestContainer}>
        <div className={styles.requestItem}>{props.country}</div>
        <div className={styles.requestItem}>{props.city}</div>
        <div className={styles.requestItem}>{props.start_date}</div>
        <div className={styles.requestItem}>{props.end_date}</div>
        <>
          <button
            className={`${styles.requestButton} ${styles.requestItem}`}
            onClick={() => props.deleteTrip(props.id)}
          >
            Delete
          </button>

          <button
            className={`${styles.requestButton} ${styles.requestItem}`}
            onClick={() => setShowUpdateModal(true)}
          >
            Update
          </button>
        </>
      </div>
    </>
  );
};

export default Trip;
