import React, { useState } from "react";
import Card from "../../../../Features/Card/Card";
import UpdateEventForm from "./UpdateForm";
import ConfirmPopup from "../../../../Features/ConfirmationCard/ConfirmPopup";

export default function UpdateEvent({ cancel, event, dispatch }) {

  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);
  const [updateEvent, setUpdateEvent] = useState({});
  function updatePost(inputEvent) {
    dispatch({ type: 'update', payload: { event: inputEvent } });
  }
  
  return (
    <>
      <Card>
        <div className="overlay">
        <div className="update-event-container">
          <h4>{event.title}</h4>
          <UpdateEventForm
            cancel={cancel}
            updatePost={updatePost}
            event={event}
            dispatch={dispatch}
          />
        </div>
        </div>
      </Card>
    </>
  );
}
