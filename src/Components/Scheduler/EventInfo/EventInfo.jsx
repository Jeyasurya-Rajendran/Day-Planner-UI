import moment from "moment";
import React, { useContext, useState, useCallback, useEffect } from "react";

import { convertDate } from "../Events/Events";
import "./EventInfo.scss";
import ConfirmPopup from "../../../Features/ConfirmationCard/ConfirmPopup";
import Card from "../../../Features/Card/Card";
import { AppointmentContext } from "../../../Context/AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import UpdateEvent from "./UpdateEventInfo/UpdateEventInfo";

const eventStyling = (startTime, endTime) => {
  const StartTime = moment(convertDate(startTime)).format();
  const EndTime = moment(convertDate(endTime)).format();

  const top = moment(StartTime).hours() * 60 + moment(StartTime).minutes();
  const height = moment(EndTime).diff(moment(StartTime), "minutes") - 20;

  let minHeight = height > 114 ? height : "auto";

  if (top > 1200) {
    let bottom = -(top + height + 20);
    return {
      bottom: bottom,
      minHeight: minHeight,
    };
  }

  return {
    top: top,
    minHeight: minHeight,
  };
};

export default function EventInfo({ event, dispatch }) {
  const eventStyle = eventStyling(event.startDateTime, event.endDateTime);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] =
    useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  function CancelConfirmation() {
    setIsConfirmationPopupVisible(false);
  }
  function CancelUpdation() {
    setIsUpdateFormVisible(false);
  }
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      dispatch({ type: "cancel" });
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
      <div className="event-info" style={eventStyle}>
        <div className="event-info-container">
          <div className="event-context">
            <div className="event-title">
              <h4>{event.title}</h4>
              <div className="icon-group">
                {event.routine == 0 && (
                  <div
                    className="edit-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsUpdateFormVisible(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                )}
                <div
                  className="delete-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsConfirmationPopupVisible(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div
                  className="cancel-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "cancel" });
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            </div>
            {event.description !== "" && (
              <div className="event-description">{event.description}</div>
            )}
          </div>
          <div className="event-duration">
            <div>
              {" "}
              {moment(convertDate(event.startDateTime)).format("HH:mm")} -{" "}
              {moment(convertDate(event.endDateTime)).format("HH:mm")}{" "}
            </div>
          </div>
        </div>
      </div>
      {/* </Card> */}

      {isUpdateFormVisible && (
        <UpdateEvent
          cancel={CancelUpdation}
          event={event}
          dispatch={dispatch}
        />
      )}

      {isConfirmationPopupVisible && (
        <ConfirmPopup
          message={"Do you want to delete?"}
          eventStyle={eventStyle}
          cancel={CancelConfirmation}
          event={event}
          dispatch={dispatch}
          type="delete"
        />
      )}
    </>
  );
}
