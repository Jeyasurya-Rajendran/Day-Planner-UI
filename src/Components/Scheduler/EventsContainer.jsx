import React, { useContext, useState } from "react";
import "./EventsContainer.scss";
import CreateEvent from "../CreateEventModal/CreateEventModal";
import Card from "../../Features/Card/Card";
import TimelineContainer from "../../Features/Timeline/TimelineContainer";
import Events from "./Events/Events";
import { AppointmentContext } from "../../Context/AppointmentContext";
import moment from "moment";
import "./EventsContainer.scss";

export default function EventsContainer({ response }) {
  const { date } = useContext(AppointmentContext);
  const [currentDate, setCurrentDate] = date;

  const [isCreateEventVisible,setIsCreateEventVisible] = useState(false);

  function toggleCreateEventVisibility(){
    setIsCreateEventVisible(!isCreateEventVisible);
  }

  return (
    <>
      {isCreateEventVisible && <CreateEvent toggleCreateEventVisibility = {toggleCreateEventVisibility}/>}
      <Card>
        <div className="event-schedule-container">
            <div className="scheduler-title-date">
              <h2>Scheduler</h2>
              <div>{moment(currentDate).format("MMMM, DD dddd")}</div>
            </div>
            <div className="timeline-segment">
              <div className="timeline-container">
                <TimelineContainer toggleCreateEventVisibility={toggleCreateEventVisibility}/>
                <div className="events-container"><Events /></div>
              </div>
            </div>
          </div>
      </Card>
    </>
  );
}
