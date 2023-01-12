import moment from "moment";
import React, { useState, useContext } from "react";
import Card from "../../Features/Card/Card";
import { AppointmentContext } from "../../Context/AppointmentContext";
import NotifyCard from "../../Features/NotifyCard/NotifyCard";
import ConfirmPopup from "../../Features/ConfirmationCard/ConfirmPopup";

export default function EventForm({ addPost, toggleCreateEventVisibility }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(
    moment().format("yyyy-MM-DDTHH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment().add(1, "hour").format("yyyy-MM-DDTHH:mm")
  );

  function clearInputValues() {
    setTitle("");
    setDescription("");
    setStartTime(moment().format("yyyy-MM-DDTHH:mm"));
    setEndTime(moment().add(1, "hour").format("yyyy-MM-DDTHH:mm"));
  }

  function eventSubmit(e) {
    e.preventDefault();
    let event = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
    };

    event.title = event.title.replace(/\s+/g, " ").trim();
    addPost(event);
  }

  return (
    <>
        <form className="event-form" onSubmit={eventSubmit}>
          <div className="text-input">
            <label className="text-title">Title</label>
            <input
              className="title-input"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              required
              pattern="^[a-zA-Z0-9_]+( +[a-zA-Z0-9_ ]+)*$"
              title="Start with alphabets, give only single spaces between words"
            ></input>
          </div>
          <div className="time-group">
            <div className="date-time">
              <label>From</label>
              <input
                type="datetime-local"
                value={startTime}
                required
                onChange={(e) => {
                  e.preventDefault();
                  setStartTime(e.target.value);
                }}
              ></input>
            </div>
            <div className="date-time">
              <label>To</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => {
                  e.preventDefault();
                  setEndTime(e.target.value);
                }}
                required
              ></input>
            </div>
          </div>
          <div className="text-input">
            <label>Description</label>
            <textarea
              value={description}
              placeholder="Description"
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="button-group">
            <button className="custom-button-large button-dark" type="submit">
              Create
            </button>
            <button
              className="custom-button-large"
              onClick={(e) => {
                e.preventDefault();

                toggleCreateEventVisibility();
              }}
            >
              Cancel
            </button>
            <button
              className="custom-button-large"
              onClick={(e) => {
                e.preventDefault();
                clearInputValues();
              }}
            >
              Reset
            </button>
          </div>
        </form>
    </>
  );
}
