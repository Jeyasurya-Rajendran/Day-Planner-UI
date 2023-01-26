import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import api from "../../Api/appointments";
import Card from "../../Features/Card/Card";
import CreateEvent from "../CreateEventModal/CreateEventModal";
import { AppointmentContext } from "../../Context/AppointmentContext";
import Calendar from "../Calendar/Calendar";
import EventsContainer from "../Scheduler/EventsContainer";
import "./HomePage.scss";
import Routines from "../Routines/Routines";

export default function HomePage() {
  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);
  const { date } = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;

  function toggleCreateEventVisibility() {
    setIsCreateEventVisible(!isCreateEventVisible);
  }

  return (
    <div className="scheduler-segment">
      {isCreateEventVisible && (
        <CreateEvent
          toggleCreateEventVisibility={toggleCreateEventVisibility}
        />
      )}
      <EventsContainer />
      <Card>
        <div className="calendar-create-segment">
          <Calendar />
          <button
            className="custom-button-large button-dark"
            disabled={moment(selectedDate) < moment().subtract(1,"day")}
            onClick={(e) => {
              e.preventDefault();
              toggleCreateEventVisibility();
            }}
          >
            Create Event
          </button>
        </div>
        <Routines />
      </Card>
    </div>
  );
}
