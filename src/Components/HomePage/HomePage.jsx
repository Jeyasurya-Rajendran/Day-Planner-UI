import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import api from "../../Api/appointments";
import Card from "../../Features/Card/Card";
import CreateEvent from "../CreateEventModal/CreateEventModal";
import { AppointmentContext } from "../../Context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { ACTION } from "./Home/Home";
import Calendar from "../Calendar/Calendar";
import EventsContainer from "../Scheduler/EventsContainer";
import "./HomePage.scss";

export default function HomePage() {
  
  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);

  function toggleCreateEventVisibility(){
    setIsCreateEventVisible(!isCreateEventVisible);
  }

  return (
    <div className="scheduler-segment">
      {isCreateEventVisible && <CreateEvent toggleCreateEventVisibility = {toggleCreateEventVisibility}/>}
      <EventsContainer />
      <Card>
        <div className="calendar-create-segment">
          <Calendar />
          <button className="custom-button-large button-dark" onClick={(e)=>{
            e.preventDefault();
            toggleCreateEventVisibility();
          }}>Create Event</button>
        </div>
      </Card>
    </div>
  );
}
