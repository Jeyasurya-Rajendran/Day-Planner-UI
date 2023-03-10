import moment from "moment";
import React, { useState, useContext } from "react";
import { AppointmentContext } from "../../Context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";


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
          <div className="required-input">
            <label className="text-title">
              Title
            </label>
            <FontAwesomeIcon icon={faStarOfLife} className="required-symbol"/>
          </div>
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
          ></input>
        </div>
        <div className="time-group">
          <div className="date-time">
          <div className="required-input">
            <label className="text-title">
              From
            </label>
            <FontAwesomeIcon icon={faStarOfLife} className="required-symbol"/>
          </div>
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
          <div className="required-input">
            <label className="text-title">
              To
            </label>
            <FontAwesomeIcon icon={faStarOfLife} className="required-symbol"/>
          </div>
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
                setSelectedRoutine(1);
              }}
              value={isRoutine}
            />
            As Routine
          </div>
          <div className="radio-inputs">
            <div className="radio-input" id="week">
              <input
                type={"radio"}
                disabled={!isRoutine}
                name="routine"
                checked={true}
                onChange={() => {
                  setSelectedRoutine(1);
                }}
              />
              Weekly
            </div>
            <div className="radio-input">
              <input
                type={"radio"}
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
