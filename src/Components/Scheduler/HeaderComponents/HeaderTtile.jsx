import React, {useContext} from "react";
import { AppointmentContext } from "../AppointmentContext";
import Date from "../../../Features/Date/Date";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


export default function HeaderTitle() {

  const {date, changeDate} = useContext(AppointmentContext);
  const [currentDate, setCurrentDate] = date;
  const [isChangeDate, setIsChangeDate] = changeDate;


  return (
    
    <>
      <div className="date-header">
        {isChangeDate && <Date />}
        {!isChangeDate && (
          <div className="date-header-grp">
            <h2 style={{ "user-select": "none" }}>
              {moment(currentDate).format("MMM Do YYYY")}
            </h2>
          </div>
        )}
      </div>
      {!isChangeDate && (
        <div className="icon-group">
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
      )}
    </>
  );
}
