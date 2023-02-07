import React, { useContext } from "react";
import moment from "moment/moment";
import { timeline } from "./Timeline";
import "./TimelineContainer.scss";
import { AppointmentContext } from "../../Context/AppointmentContext";

export default function TimelineContainer({toggleCreateEventVisibility}) {
  
  const {date} = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;
  return (
    <>
      {timeline.map((time) => {
        return (
          <div className="timeline">
            <div className="time">
              <div className="start-time">{moment(time.startTime,'HH:mm').format('h a')}</div>
            </div>
            <div className="time-event-space" onClick={(e)=>{
              e.preventDefault();
              if(moment(selectedDate) >= moment().subtract(1,"day"))
                toggleCreateEventVisibility();
            }}>
            </div>
          </div>
        );
      })}
    </>
  );
}
