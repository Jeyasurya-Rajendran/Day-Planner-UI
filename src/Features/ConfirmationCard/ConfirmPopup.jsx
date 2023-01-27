import React, {useCallback, useEffect} from "react";
import "./ConfirmPopup.scss";

export default function ConfirmPopup({ message, cancel, event, dispatch, type }) {

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
    <div className="overlay">
      <div className="popup-container">
        <div className="">
          <div className="popup-message"><h3>{message}</h3></div>
          <div className="popup-button-grp">
            <button
              className="custom-button button-light"
              onClick={(e) => {
                e.preventDefault();
                cancel();
              }}
            >
              Cancel
            </button>
            <button
              className="custom-button button-dark"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: type, payload: { event: event } });
                cancel();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
