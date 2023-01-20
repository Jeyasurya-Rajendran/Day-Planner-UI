import React, { useContext, useEffect, useReducer, useState } from "react";
import moment from "moment";
import "./Events.scss";
import EventInfo from "../EventInfo/EventInfo";
import api from "../../../Api/appointments";
import { AppointmentContext } from "../../../Context/AppointmentContext";
import {
  getAppointmentApi,
  deleteAppointmentApi,
  updateAppointmentApi,
} from "../../../Api/apiCalls";
import NotifyCard from "../../../Features/NotifyCard/NotifyCard";
export const eventStyling = (startTime, endTime) => {
  const StartTime = moment(convertDate(startTime)).format();
  const EndTime = moment(convertDate(endTime)).format();

  const top = moment(StartTime).hours() * 60 + moment(StartTime).minutes();
  const height = moment(EndTime).diff(moment(StartTime), "minutes") - 20;
  const fontSize = height < 15 ? "10px" : "16px";

  return {
    top: top,
    height: height,
    fontSize: fontSize,
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
    case "delete":
      return {
        ...state,
        eventInfoClicked: !state?.eventInfoClicked,
        deleteEvent: action.payload?.event,
      };
    case "update":
      return {
        ...state,
        eventInfoClicked: !state?.eventInfoClicked,
        updateEvent: action.payload.event,
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
    updateEvent: {},
    event: {},
  });

  const { appointments, date } = useContext(AppointmentContext);
  const [events, setEvents] = appointments;
  const [currentDate, setCurrentDate] = date;
  const [isNotifyPopupVisible, setIsNotifyPopupVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState({});

  function NotifyPopup() {
    setTimeout(() => {
      setIsNotifyPopupVisible(true);
      setTimeout(() => {
        setIsNotifyPopupVisible(false);
      }, 4000);
    }, 300);
  }

  useEffect(() => {
    if (state.deleteEvent.startDateTime) {
      deleteAppointmentApi(state.deleteEvent.id)
      .then(()=>{
        setEvents(()=>{
          events.filter((event)=>event.startDateTime !== state.deleteEvent.startDateTime);
        })
      });
    }
  }, [state.deleteEvent]);

  useEffect(() => {
    if (state.updateEvent.startDateTime) {
      console.log(state.updateEvent);
      updateAppointmentApi(state.event.id, state.updateEvent)
      .then((response) => {
        setResponseMessage(response);
        setEvents((prevEvents)=>{
          return [...prevEvents, state.event]
          });
        NotifyPopup();
      })
      .catch((error) => {
        console.log(error.response);
        setResponseMessage(error.response);
        NotifyPopup();
      });
    }
  }, [state.updateEvent]);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    getAppointmentApi(currentDate).then((data) => {
      setResponse(data);
    });
  }, [events, currentDate]);

  return (
    <>
      {isNotifyPopupVisible && (
        <div>
          <NotifyCard response={responseMessage} />
        </div>
      )}
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

      {/* {isConfirmationPopupVisible && (
        <ConfirmPopup
          message={"Do you want to update?"}
          cancel={cancel}
          event={updateEvent}
          dispatch={dispatch}
          type='update'
        />
      )} */}
    </>
  );
}
