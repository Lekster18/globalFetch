import { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface RequestOverLayProps {
  id: number;
  date: string;
  price: number;
  description: string;
  country: string;
  city: string;
  setShowReqUpdateModal: (show: boolean) => void;
  getUserRequest: () => void;
}

const RequestOverLay: React.FC<RequestOverLayProps> = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const updateRequest = async (id: number) => {
    const res = await fetchData(
      "/api/request/" + id,
      "PUT",
      {
        country: countryRef.current!.value,
        city: cityRef.current!.value,
        description: descriptionRef.current!.value,
        price: priceRef.current!.value,
        date: dateRef.current!.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.getUserRequest();
      props.setShowReqUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (
      countryRef.current &&
      cityRef.current &&
      dateRef.current &&
      priceRef.current &&
      descriptionRef.current
    ) {
      countryRef.current.value = props.country;
      cityRef.current.value = props.city;
      dateRef.current.value = props.date;
      priceRef.current.value = props.price.toString();
      descriptionRef.current.value = props.description;
    }
  }, [props.country, props.city, props.date, props.price, props.description]);
  return (
    <div>
      <div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">Item description</div>
          <input ref={descriptionRef} type="text" className="col-md-3" />
          <div className="col-md-1"></div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">Price</div>
          <input ref={priceRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">Collection Date</div>
          <input ref={dateRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">Country</div>
          <input ref={countryRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">City</div>
          <input ref={cityRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button onClick={() => updateRequest(props.id)} className="col-md-3">
            update
          </button>
          <button
            onClick={() => props.setShowReqUpdateModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

interface RequestUpdateModalProps extends RequestOverLayProps {
  setShowReqUpdateModal: (show: boolean) => void;
  getUserRequest: () => void;
}

const RequestUpdateModal: React.FC<RequestUpdateModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <RequestOverLay
          id={props.id}
          country={props.country}
          city={props.city}
          date={props.date}
          price={props.price}
          description={props.description}
          setShowReqUpdateModal={props.setShowReqUpdateModal}
          getUserRequest={props.getUserRequest}
        />,
        document.querySelector("#modal-root")!
      )}
    </>
  );
};

export default RequestUpdateModal;
