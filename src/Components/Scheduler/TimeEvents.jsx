import React, { useContext, useEffect, useReducer, useState } from "react";
import moment from "moment";
import "./TimeEvents.scss";
import EventInfo from "./EventInfo";
import { HomeOptionContext } from "../Home.jsx/HomeOptionContext";
import api from "../../Api/appointments";

export const eventStyling = (startTime, endTime) => {
    const StartTime = moment(convertDate(startTime)).format();
    const EndTime = moment(convertDate(endTime)).format();
    const top = moment(StartTime).hours() * 60.78 + moment(StartTime).minutes();
    const height = (moment(EndTime).hours() - moment(StartTime).hours()) * 60 +
        (moment(EndTime).minutes() - moment(StartTime).minutes()) -
        20;
    const fontSize = height < 15 ? "10px" : "16px";

    return {
        top: top,
        height: height,
        fontSize: fontSize,
    };
}

export const convertDate = (eventDate) => {
    return String(eventDate?.replace("T", " "))?.substring(0, 19);
  };

function reducer(state, action){
    switch (action.type){
        case "select":
            return {...state, eventInfoClicked:!state?.eventInfoClicked, event:action.payload.event};
        case "delete":
            return {...state, eventInfoClicked:!state?.eventInfoClicked, deleteEvent: action.payload?.event}
        case "cancel":
            return {...state , eventInfoClicked:!state?.eventInfoClicked, event:{}}
    }
}


export default function TimeEvents({ response }) {

  const [state, dispatch] = useReducer(reducer, { eventInfoClicked: false, deleteEvent: {}, event: {} });

  const {eventList} = useContext(HomeOptionContext);

  console.log(eventList)

  useEffect(()=>{
    api.delete("/appointments/id/"+state.deleteEvent.id).then(()=>{console.log("success")});
    
    // console.log(state.deleteEvent.id);
  },[state.deleteEvent]);


  return (
    <>
      {response?.map((events) => {
        return (
          <div>
            <div
              className="event-style"
              style={eventStyling(events.startDateTime, events.endDateTime)}
              onClick={(e) => {
                e.preventDefault();
                dispatch({type: "select",payload:{event:events}})
              }}
            >
              {events.title}
            </div>
          </div>
        );
      })}

      {state.eventInfoClicked && <EventInfo event={state.event} dispatch={dispatch}/>}
    </>
  );
}

