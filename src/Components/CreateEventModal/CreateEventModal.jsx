import React, { useState, useContext } from "react";
import Card from "../../Features/Card/Card";
import api from "../../Api/appointments";
import "./CreateEvent.scss";
import NotifyCard from "../../Features/NotifyCard/NotifyCard";
import EventForm from "./EventForm";
import { AppointmentContext } from "../../Context/AppointmentContext";

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
    api
      .post("/appointments", {
        startDateTime: request.startTime,
        endDateTime: request.endTime,
        title: request.title,
        description: request.description,
      })
      .then((response) => {
        console.log(response);
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
        console.log(error);
        setResponseMessage(error.response);
        NotifyPopup();
      });
  }

  return (
    <>
      <div className="create-page">
        <div className="create-event overlay">
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
