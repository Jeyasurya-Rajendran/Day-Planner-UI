import moment from "moment";
import React, { useState, useContext } from "react";
import "./Date.scss";
import { AppointmentContext } from "../../Context/AppointmentContext";

export default function Date() {
  const { date, toggleDatePickerVisibility } = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;
  const [isDatePickerVisible, setisDatePickerVisible] = toggleDatePickerVisibility;

  const [dateValue, setDateValue] = useState(moment(selectedDate).format("YYYY-MM-DD"));

  return (
    <div className="date-input">
      <input
        type={"date"}
        value={dateValue}
        onChange={(e) => {
          e.preventDefault();
          setDateValue(e.target.value);
        }}
        contentEditable="false"
      />
      <button
        type="submit"
        className="submit"
        onClick={(e) => {
          e.preventDefault();
          setSelectedDate(dateValue);
          setisDatePickerVisible(false);
        }}
      >
        OK
      </button>
    </div>
  );
}
