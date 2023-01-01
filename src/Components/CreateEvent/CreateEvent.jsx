import moment from "moment";
import React, { useState } from "react";
import Card from "../../Features/Card/Card";
import api from '../../Api/appointments';
import "./CreateEvent.scss";

export default function CreateEvent({
  prevSelectedOption,
  resetSelectedOption,
  addEvents,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(
    moment().format("yyyy-MM-DDTHH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment().add(1, "hour").format("yyyy-MM-DDTHH:mm")
  );

  const [event, setEvent] = useState({});

  function clearInputValues() {
    setTitle("");
    setDescription("");
    setStartTime(moment().format("yyyy-MM-DDTHH:mm"));
    setEndTime(moment().add(1, "hour").format("yyyy-MM-DDTHH:mm"));
    setEvent({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    event.title = title;
    event.description = description;
    event.startTime = startTime;
    event.endTime = endTime;

    addEvents(event);
    clearInputValues();
    resetSelectedOption(prevSelectedOption);
  }

  return (
    <div className="align-centre">
      <Card>
        <div>
          <h2>Add appointment</h2>
        </div>
        <div>
          <form className="event-form" onSubmit={handleSubmit}>
            <div className="text-input">
              <label>Title</label>
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
                
              ></input>
            </div>
            <div className="time-group">
              <div className="date-time">
                <label>start</label>
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
              <dv className="date-time">
                <label>end</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => {
                    e.preventDefault();
                    setEndTime(e.target.value);
                  }}
                  required
                ></input>
              </dv>
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
              <button className="custom-button-large" type="submit" onClick={handleSubmit}>
                Create
              </button>
              <button
                className="custom-button-large"
                onClick={(e) => {
                  e.preventDefault();
                  resetSelectedOption(prevSelectedOption);
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
        </div>
      </Card>
    </div>
  );
}
