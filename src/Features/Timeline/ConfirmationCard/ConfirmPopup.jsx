import React from "react";
import "./ConfirmPopup.scss";

export default function ConfirmPopup({ message, eventStyle, cancel, event, dispatch }) {
  return (
    <div className="overlay">
      <div className="event-info-container popup-container">
        <div className="event-inner-container">
          <div className="popup-message"><h3>{message}</h3></div>
          <div className="button-group popup-btn-grp">
            <button
              className="custom-button"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "delete", payload: { event: event } });
                cancel();
              }}
            >
              Sure
            </button>
            <button
              className="custom-button"
              onClick={(e) => {
                e.preventDefault();
                cancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
