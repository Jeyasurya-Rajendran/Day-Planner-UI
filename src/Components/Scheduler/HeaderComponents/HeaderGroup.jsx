import React, { useContext, useState } from "react";
import HeaderTitle from "./HeaderTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { AppointmentContext } from "../../../Context/AppointmentContext";
import "./HeaderGroup.scss";


export const HeaderGroup = () => {

  const {date}= useContext(AppointmentContext);
  // const [isDatePickerVisible, setisDatePickerVisible] = toggleDatePickerVisibility;

  // function datePickerIconClick(e){
  //   e.preventDefault();
  //   setisDatePickerVisible(!isDatePickerVisible);
  // }

  return (
    <>
      <div className="header-group">
        <div className="header-context">
          <HeaderTitle />
          {/* <div className="calendar-icon" onClick={datePickerIconClick}>
            <FontAwesomeIcon icon={faCalendarDays} size={"2x"} />
          </div> */}
        </div>
      </div>
    </>
  );
};
