import React, { useContext } from "react";
import { AppointmentContext } from "../../../Context/AppointmentContext";
import Date from "../../../Features/Date/Date";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTitle.scss";

export default function HeaderTitle() {
  const {date} = useContext(AppointmentContext);
  const [currentDate, setCurrentDate] = date;

  return (
    <>
      <div className="date-header-group">
        {/* {isDatePickerVisible && <Date />} */}
        {true && (
          <div className="date-header">
            <h4 style={{ "user-select": "none" }}>
              {moment(currentDate).format("MMM Do YYYY")}
            </h4>
          </div>
        )}
      </div>
      {true && (
        <div className="icon-group">
          <div>
            <span
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                setCurrentDate((prevDate) => {
                  if (prevDate > moment())
                    return moment(prevDate).subtract(1, "day");
                  else return prevDate;
                });
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </div>
          <div>
            <span
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                setCurrentDate((prevDate) => {
                  return moment(prevDate).add(1, "day");
                });
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
