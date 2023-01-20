import React from "react";
import "./ConfirmPopup.scss";

export default function ConfirmPopup({ message, eventStyle, cancel, event, dispatch, type }) {
  return (
    <div className="overlay">
      <div className="popup-container">
        <div className="">
          <div className="popup-message"><h3>{message}</h3></div>
          <div className="popup-button-grp">
            <button
              className="custom-button button-light"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: type, payload: { event: event } });
              }}
            >
              Yes
            </button>
            <button
              className="custom-button button-dark"
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
