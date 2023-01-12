import React from "react";
import Card from "../../../../Features/Card/Card";
import UpdateEventForm from "./UpdateForm";

export default function UpdateEvent({ cancel, event, dispatch }) {
  function updatePost() {}
  return (
    <>
      <Card>
        <div className="update-event-container">
          <h4>{event.title}</h4>
          <UpdateEventForm
            cancel={cancel}
            updatePost={updatePost}
            event={event}
          />
        </div>
      </Card>
    </>
  );
}
