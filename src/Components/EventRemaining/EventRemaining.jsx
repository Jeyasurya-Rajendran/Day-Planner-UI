import React, { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../Context/AppointmentContext";
import { getAppointmentApi } from "../../Api/apiCalls";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../Features/Card/Card";
import "./EventRemaining.scss";

export default function EventRemaining() {
  const {reload} = useContext(AppointmentContext);
  const [retreiveAppointments, setRetreiveAppointments] = reload;
  const [response, setResponse] = useState([]);
  const [remainingEventsVisibility, setRemainingEventsVisibility] = useState(false);

  useEffect(() => {
    getAppointmentApi(moment()).then((data) => {
      setResponse(data);
    });
  }, [retreiveAppointments]);
  return (
    <>
      <div className={`remaining-events ${remainingEventsVisibility && "remaining-events-visible"}`}>
        <span className="remaining-events-icon" onClick={()=>{
          setRemainingEventsVisibility((prevVisibility)=>{
            return !prevVisibility;
          })
        }}>
          {remainingEventsVisibility?<FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />}
        </span>
        <Card>
          <div className="remaining-events-container">Remaining plans today : {response.length}</div>
        </Card>
      </div>
    </>
  );
}
