import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import Card from "../../Features/Card/Card";
import Date from "../../Features/Date/Date";
import TimelineTemp from "../../Features/Timeline/TimelineTemp";
import api from "../../Api/appointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCalendarDays, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Scheduler.scss";
// import { getEvents } from "../Home.jsx/Home";

export default function Scheduler({
  prevSelectedOption,
  resetSelectedOption,
  events,
}) {

  const today = moment().format();
  const [currentDate, setCurrentDate] = useState(today);
  const [formattedDate, setFormattedDate] = useState(
    moment(currentDate).format("YYYY-MM-DD")
  );
  const [response, setResponse] = useState([{}]);
  const [isChangeDate, setIsChangeDate] = useState(false);

  useEffect(() => {
    api.get('/appointments?date='+moment(currentDate).format("YYYY-MM-DD"))
    .then((response)=>{
      setResponse(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("/appointments?date=" + moment(currentDate).format("YYYY-MM-DD"))
      .then((response) => {
        setResponse(response.data);
      });
  }, [currentDate,events]);

  function changeDate(date){
    setIsChangeDate(false);
    setCurrentDate(moment(date).format());
  }

  function handleClick(e){
    e.preventDefault();
    setIsChangeDate(true);
  }

  return (
    <>
      <div className="align-centre">
        <Card>
          <div className="header-group">
            <div className="header">
              <div className="date-header">
                {isChangeDate && <Date changeDate={changeDate}/>}
                {!isChangeDate && <div className="date-header-grp"><h2 style={{"user-select": "none"}}>{moment(currentDate).format("MMM Do YYYY")}</h2></div>}
              </div>
              {!isChangeDate && <div className="icon-group">
                <span
                  className="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentDate((prevDate) => {
                      if (prevDate > moment(today))
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
              </div>}
              <div className="calendar-icon" onClick={handleClick}><FontAwesomeIcon icon={faCalendarDays} size={"2x"}/></div>
            </div>

            <div>
              <button
                className="custom-button-large"
                onClick={(e) => {
                  e.preventDefault();
                  resetSelectedOption(prevSelectedOption);
                }}
              >
                Back
              </button>
            </div>
          </div>

          <div className="body" style={{"position":"relative"}}>
            <TimelineTemp response={response} />
          </div>
          
        </Card>
        <button className="create-btn"><div className="create-btn-icon"><FontAwesomeIcon icon={faPlus} /></div><div className="create-btn-name">Create</div></button>

      </div>
    </>
  );
}
