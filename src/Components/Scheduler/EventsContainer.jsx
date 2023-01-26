import React, { useContext, useState } from "react";
import "./EventsContainer.scss";
import CreateEvent from "../CreateEventModal/CreateEventModal";
import Card from "../../Features/Card/Card";
import TimelineContainer from "../../Features/Timeline/TimelineContainer";
import Events from "./Events/Events";
import { AppointmentContext } from "../../Context/AppointmentContext";
import moment from "moment";
import "./EventsContainer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function EventsContainer({ response }) {
  const { date } = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;

  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);

  function toggleCreateEventVisibility() {
    setIsCreateEventVisible(!isCreateEventVisible);
  }
  
  return (
    <>
      {isCreateEventVisible && (
        <CreateEvent
          toggleCreateEventVisibility={toggleCreateEventVisibility}
        />
      )}
      <Card>
        <div className="event-schedule-container">
          <div className="scheduler-title-date">
            <div>
              <h2>Scheduler</h2>
              <div>{moment(selectedDate).format("MMMM, DD dddd")}</div>
            </div>
            <div>
              <div className="icon-group">
                <span
                  className="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedDate((prevSelectedDate) => {
                      // if (
                      //   prevSelectedDate.format('ll') > moment().format('ll')
                      // )
                        return moment(prevSelectedDate).subtract(1, "day");
                      // else return moment(prevSelectedDate);
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </span>
                <span
                  className="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedDate((prevSelectedDate) => {
                      return moment(prevSelectedDate).add(1, "day");
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </div>
            </div>
          </div>
          <div className="timeline-segment">
            <div className="timeline-container">
              <TimelineContainer
                toggleCreateEventVisibility={toggleCreateEventVisibility}
              />
              <div className="events-container">
                <Events />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
