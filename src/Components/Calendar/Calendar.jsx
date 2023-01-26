import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "./Calendar.scss";
import buildCalender from "./BuildCalender";
import dayStyles from "./StyleCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { AppointmentContext } from "../../Context/AppointmentContext";

let count = 0;

export default function Calendar() {
  const {date} = useContext(AppointmentContext);
  const [selectedDate, setSelectedDate] = date;
  const [calendar, setCalendar] = useState([]);
  const [generateDate, setGenerateDate] = useState(moment());

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    setCalendar(buildCalender(generateDate));
  }, [generateDate]);

  useEffect(()=>{
    setGenerateDate(selectedDate);
  },[selectedDate])

  return (
    <>
      <div className="calendar">
        <div className="month">
          <h3>{moment(generateDate).format('MMMM\'YY')}</h3>
          <div className="icon-group">
          <div>
            <span
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                setGenerateDate((prevGenerateDate)=>{
                  return moment(prevGenerateDate).subtract(1,'month');
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
                setGenerateDate((prevGenerateDate)=>{
                  return moment(prevGenerateDate).add(1,'month');
                })

              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </div>
        </div>
        <div className="weekdays">
          {weekdays.map((day) => (
            <div className="week">{day}</div>
          ))}
        </div>
        {calendar.map((week) => {
          return (
            <div>
              {week.map((day) => (
                <div className="day" onClick={(e) => {
                  e.preventDefault();
                  if(day.format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD'))
                    setSelectedDate(day)
                }}>
                  <div className={dayStyles(day, selectedDate)}>
                    {day.format("D").toString()}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
