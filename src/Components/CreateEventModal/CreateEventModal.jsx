import React, { useState, useContext, useCallback, useEffect } from "react";
import Card from "../../Features/Card/Card";
import api from "../../Api/appointments";
import "./CreateEvent.scss";
import NotifyCard from "../../Features/NotifyCard/NotifyCard";
import EventForm from "./EventForm";
import { AppointmentContext } from "../../Context/AppointmentContext";
import { createAppointmentApi } from "../../Api/apiCalls";

export default function CreateEventModal({ toggleCreateEventVisibility }) {
  const { appointments } = useContext(AppointmentContext);
  const [events, setEvents] = appointments;

  const [event, setEvent] = useState({});
  const [responseMessage, setResponseMessage] = useState({});
  const [isNotifyPopupVisible, setIsNotifyPopupVisible] = useState(false);

  function NotifyPopup() {
    setTimeout(() => {
      setIsNotifyPopupVisible(true);
      setTimeout(() => {
        setIsNotifyPopupVisible(false);
      }, 4000);
    }, 300);
  }

  function addPost(request) {
    createAppointmentApi(request)
      .then((response) => {
        setResponseMessage(response);
        NotifyPopup();
        setEvents((prevEvents) => {
          return [...prevEvents, request];
        });
        setTimeout(() => {
          toggleCreateEventVisibility();
        }, 1000);
      })
      .catch((error) => {
        setResponseMessage(error.response);
        NotifyPopup();
      });
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      toggleCreateEventVisibility();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <>
      <div className="create-page overlay">
        <div className="create-event">
          {isNotifyPopupVisible && (
            <div>
              <NotifyCard response={responseMessage} />
            </div>
          )}
          <Card>
            <div className="event-form-styling">
              <div className="event-input-title">
                <h2>Add appointment</h2>
              </div>
              <div>
                <EventForm
                  addPost={addPost}
                  toggleCreateEventVisibility={toggleCreateEventVisibility}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
