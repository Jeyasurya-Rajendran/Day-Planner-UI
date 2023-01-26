import moment from "moment";
import React, { useState, useContext } from "react";
import { AppointmentContext } from "../../Context/AppointmentContext";


export default function EventForm({ addPost, toggleCreateEventVisibility }) {
  const {date} = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(
    moment(selectedDate).format("yyyy-MM-DDTHH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment(selectedDate).add(1, "hour").format("yyyy-MM-DDTHH:mm")
  );
  const [isRoutine, setIsRoutine] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(0);

  function clearInputValues() {
    setTitle("");
    setDescription("");
    setStartTime(moment().format("yyyy-MM-DDTHH:mm"));
    setEndTime(moment().add(1, "hour").format("yyyy-MM-DDTHH:mm"));
    setIsRoutine(false);
    setSelectedRoutine(0);
  }

  function eventSubmit(e) {
    e.preventDefault();
    let event = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      isRoutine: isRoutine,
      selectedRoutine: isRoutine ? selectedRoutine : 0,
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
            // oninvalid="this.setCustomValidity('Please enter your name');"
            // pattern="^[a-zA-Z0-9':-_]+( +[a-zA-Z0-9':-_ ]+)*$"
            // title="Start with alphabets, give only single spaces between words"
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
              required
              onChange={(e) => {
                e.preventDefault();
                setEndTime(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="routine-input">
          <div className="checkbox-input">
            <input
              type={"checkbox"}
              onChange={() => {
                setIsRoutine((prevRoutine) => {
                  return !prevRoutine;
                });
              }}
              value={isRoutine}
            />
            As Routine
          </div>
          <div className="radio-inputs">
            <div className="radio-input" id="week">
              <input
                type={"radio"}
                multiple={"false"}
                disabled={!isRoutine}
                name="routine"
                onChange={() => {
                  setSelectedRoutine(1);
                }}
              />
              Weekly
            </div>
            <div className="radio-input">
              <input
                type={"radio"}
                multiple={"false"}
                disabled={!isRoutine}
                name="routine"
                onChange={() => {
                  setSelectedRoutine(2);
                }}
              />
              Monthly
            </div>
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
          <button
            className="custom-button-large button-light"
            onClick={(e) => {
              e.preventDefault();
              clearInputValues();
            }}
          >
            Reset
          </button>
          <button
            className="custom-button-large button-light"
            onClick={(e) => {
              e.preventDefault();

              toggleCreateEventVisibility();
            }}
          >
            Cancel
          </button>
          <button className="custom-button-large button-dark" type="submit">
            Create
          </button>
        </div>
      </form>
    </>
  );
}
