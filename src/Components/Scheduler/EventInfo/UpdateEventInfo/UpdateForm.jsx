import moment from "moment";
import React, {useState, useCallback, useEffect} from "react";
import { convertDate } from "../../Events/Events";
import "./UpdateForm.scss";

export default function UpdateEventForm({cancel, updatePost, event, dispatch }) {

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startDateTime, setStartTime] = useState(event.startDateTime);
  const [endDateTime, setEndTime] = useState(event.endDateTime);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      cancel();
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
      <form className="event-form" onSubmit={(e)=>{
          e.preventDefault(); 
          updatePost(
            {
              title:title,
              description:description,
              startDateTime:startDateTime,
              endDateTime:endDateTime
            }
          );}}>
        <div className="text-input">
          <label className="text-title">Title</label>
          <input
            className="title-input"
            type="text"
            value={title || ''}
            placeholder='Title'
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
            required
            pattern="^[a-zA-Z0-9'-:-)/_]+( +[a-zA-Z0-9_ ]+)*$"
            title="Start with alphabets, give only single spaces between words"
          ></input>
        </div>
        <div className="time-group">
          <div className="date-time">
            <label>From</label>
            <input
              type="datetime-local"
              value={startDateTime}
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
              value={endDateTime}
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
            value={description || ''}
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
              cancel();
            }}
          >
            Cancel
          </button>
          <button className="custom-button-large button-dark" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
