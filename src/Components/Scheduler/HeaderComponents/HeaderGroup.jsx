import React, { useContext, useState } from "react";
import HeaderTitle from "./HeaderTtile";
import { AppointmentContext } from "../AppointmentContext";
import { AppointmentProvider } from "../AppointmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { HomeOptionContext } from "../../Home.jsx/HomeOptionContext";


export const HeaderGroup = () => {

  const {date, changeDate}= useContext(AppointmentContext);
  const {option} = useContext(HomeOptionContext);
  const [selectedOption, setSelectedOption] = option;
  const [currentDate,setCurrentDate] = date;
  const [isChangeDate, setIsChangeDate] = changeDate;

  // console.log(currentDate);
  // console.log(isChangeDate);

  function handleClick(e){
    e.preventDefault();
    setIsChangeDate(true);
  }

  return (
    <>
      <div className="header-group">
        <div className="header">
          <HeaderTitle />
          <div className="calendar-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faCalendarDays} size={"2x"} />
          </div>
        </div>

        <div>
            <button
              className="custom-button-large"
              onClick={(e) => {
                e.preventDefault();
                setSelectedOption("home");
              }}
            >
              Back
            </button>
          </div>

      </div>
    </>
  );
};
