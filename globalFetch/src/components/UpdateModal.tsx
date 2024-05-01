import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";

interface OverLayProps {
  id: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  setShowUpdateModal: (show: boolean) => void;
  refreshTrips: () => Promise<void>;
}

const OverLay: React.FC<OverLayProps> = (props) => {
  const fetchData = useFetch();
  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  const updateTrip = async (id: number) => {
    const res = await fetchData(`/api/trip/${id}`, "PUT", {
      country: countryRef.current!.value,
      city: cityRef.current!.value,
      start_date: start_dateRef.current!.value,
      end_date: end_dateRef.current!.value,
    });

    if (res.ok) {
      await props.refreshTrips();
      props.setShowUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (
      countryRef.current &&
      cityRef.current &&
      start_dateRef.current &&
      end_dateRef.current
    ) {
      countryRef.current.value = props.country;
      cityRef.current.value = props.city;
      start_dateRef.current.value = props.start_date;
      end_dateRef.current.value = props.end_date;
    }
  }, [props.country, props.city, props.start_date, props.end_date]);

  return (
    <div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-1">Country</div>
        <input ref={countryRef} type="text" className="col-md-3" />
        <div className="col-md-1"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-1">City</div>
        <input ref={cityRef} type="text" className="col-md-3" />
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-1">Start Date</div>
        <input ref={start_dateRef} type="text" className="col-md-3" />
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-1">End Date</div>
        <input ref={end_dateRef} type="text" className="col-md-3" />
        <div className="col-md-3"></div>
      </div>

      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <button onClick={() => updateTrip(props.id)} className="col-md-3">
          update
        </button>
        <button
          onClick={() => props.setShowUpdateModal(false)}
          className="col-md-3"
        >
          cancel
        </button>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

interface UpdateModalProps extends OverLayProps {
  setShowUpdateModal: (show: boolean) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          country={props.country}
          city={props.city}
          start_date={props.start_date}
          end_date={props.end_date}
          setShowUpdateModal={props.setShowUpdateModal}
          refreshTrips={props.refreshTrips}
        />,
        document.querySelector("#modal-root")!
      )}
    </>
  );
};

export default UpdateModal;
