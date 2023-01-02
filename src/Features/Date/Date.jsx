import moment from "moment";
import React, { useState, useContext } from "react";
import "./Date.scss";
import { AppointmentContext } from "../../Components/Scheduler/AppointmentContext";

export default function Date() {
  const { date, changeDate } = useContext(AppointmentContext);
  const [currentDate, setCurrentDate] = date;
  const [isChangeDate, setIsChangeDate] = changeDate;

  const [dateValue, setDateValue] = useState(moment().format("YYYY-MM-DD"));

  return (
    <>
      <input
        style={{ marginBottom: "13px" }}
        type={"date"}
        value={dateValue}
        onChange={(e) => {
          e.preventDefault();
          setDateValue(e.target.value);
        }}
      />
      <button
        type="submit"
        className="submit"
        onClick={(e) => {
          e.preventDefault();
          setCurrentDate(dateValue);
          setIsChangeDate(false);
        }}
      >
        OK
      </button>
    </>
  );
}
