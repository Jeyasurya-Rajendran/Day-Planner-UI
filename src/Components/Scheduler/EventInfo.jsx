import moment from "moment";
import React, { useContext, useState } from "react";
import { ACTION } from "../Home.jsx/Home";
import { HomeOptionContext } from "../Home.jsx/HomeOptionContext";
import { convertDate } from "./TimeEvents";
import "./EventInfo.scss";
import ConfirmPopup from "../../Features/Timeline/ConfirmationCard/ConfirmPopup";

export default function EventInfo({ event, dispatch }) {
  const { option } = useContext(HomeOptionContext);
  const [selectedOption, setSelectedOption] = option;

  const eventStyling = (startTime) => {
    const StartTime = moment(convertDate(startTime)).format();
    let top = moment(StartTime).hours() * 60.78 + moment(StartTime).minutes();

    if(top > 700){
        top = top - 140;
    }
    

    return {
      top: top,
    };
  };

  const eventStyle = eventStyling(event.startDateTime, event.endDateTime);
  const [confirmation, setConfirmation] = useState(false);

  function CancelConfirmation(){
    setConfirmation(false);
  }

  return (
    <>
      <div className="event-info-container" style={eventStyle}>
        <div className="event-inner-container">
          <div className="event-context">
            <h2 className="event-title">{event.title}</h2>
            <div className="event-duration">
              TimeFrame[{" "}
              {moment(convertDate(event.startDateTime)).format("HH:mm")} to{" "}
              {moment(convertDate(event.endDateTime)).format("HH:mm")} ]
            </div>
            {event.description !== "" && (
              <div className="event-description">{event.description}</div>
            )}
          </div>
          <div className="button-group">
            <button
              className="custom-button"
              onClick={(e) => {
                e.preventDefault();
                setConfirmation(true);
              }}
            >
              Delete
            </button>
            <button
              className="custom-button"
              onClick={(e) => {
                e.preventDefault();
                // setSelectedOption(ACTION.CHECK);
                dispatch({ type: "cancel" });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
     {confirmation && <ConfirmPopup message={"Are you sure to delete?"} eventStyle={eventStyle} cancel={CancelConfirmation} event={event} dispatch={dispatch}/>}

    </>
  );
}
