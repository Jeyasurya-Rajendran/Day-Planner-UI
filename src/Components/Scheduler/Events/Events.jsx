import React, { useContext, useEffect, useReducer, useState } from "react";
import moment from "moment";
import "./Events.scss";
import EventInfo from "../EventInfo/EventInfo";
import api from "../../../Api/appointments";
import { AppointmentContext } from "../../../Context/AppointmentContext";
import Card from "../../../Features/Card/Card";

export const eventStyling = (startTime, endTime) => {
  const StartTime = moment(convertDate(startTime)).format();
  const EndTime = moment(convertDate(endTime)).format();

  const top = moment(StartTime).hours() * 60 + moment(StartTime).minutes();
  const height = moment(EndTime).diff(moment(StartTime), "minutes") -20;
  const fontSize = height < 15 ? "10px" : "16px";
 
  // if((top>1200)){
  //   let bottom = -(top+height+20);
  //   return{
  //     bottom: bottom,
  //     height: height,
  //     fontSize: fontSize
  //   }
  // }

  return {
    top: top,
    height: height,
    fontSize: fontSize,
    // bottom: bottom
  };
};

export const convertDate = (eventDate) => {
  return String(eventDate?.replace("T", " "))?.substring(0, 19);
};

function reducer(state, action) {
  switch (action.type) {
    case "select":
      return {
        ...state,
        eventInfoClicked: !state?.eventInfoClicked,
        event: action.payload.event,
      };
    case "confirm":
      return {
        ...state,
        eventInfoClicked: !state?.eventInfoClicked,
        deleteEvent: action.payload?.event,
      };
    case "cancel":
      return {
        ...state,
        eventInfoClicked: !state?.eventInfoClicked,
        event: {},
      };
  }
}

export default function Events() {
  const [state, dispatch] = useReducer(reducer, {
    eventInfoClicked: false,
    deleteEvent: {},
    event: {},
  });

  const { appointments, date } =
    useContext(AppointmentContext);
  const [events, setEvents] = appointments;
  const [currentDate, setCurrentDate] = date;

  useEffect(() => {
    if (state.deleteEvent.startDateTime) {
      api
        .delete("/appointments/" + state.deleteEvent.startDateTime)
        .then(() => {
          console.log("success");
        });
      const result = events.filter(
        (events) => events.startDateTime !== state.deleteEvent.startDateTime
      );
      setEvents(result);
    }
  }, [state.deleteEvent]);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    api
      .get("/appointments?date=" + moment(currentDate).format("YYYY-MM-DD"))
      .then((response) => {
        setResponse(response.data);
      });
  }, [events,currentDate]);

  return (
    <>
      {response?.map((event) => {
        return (
          <div
            className="event"
            style={eventStyling(event.startDateTime, event.endDateTime)}
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "select", payload: { event: event } });
            }}
          >
            <div className="event-title">{event.title}</div>
          </div>
        );
      })}

      {state.eventInfoClicked && (
        <EventInfo event={state.event} dispatch={dispatch} />
      )}
    </>
  );
}
