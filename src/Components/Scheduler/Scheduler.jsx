import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import Card from "../../Features/Card/Card";
import api from "../../Api/appointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Scheduler.scss";
// import { getEvents } from "../Home.jsx/Home";

export default function Scheduler({prevSelectedOption, resetSelectedOption, events}) {
  const today = moment().format();
  const [currentDate, setCurrentDate] = useState(today);
  const [formattedDate , setFormattedDate ] = useState(moment(currentDate).format("YYYY-MM-DD"));

  const [response, setResponse] = useState([]);
  
  useEffect(()=>{
    api.get('/appointments/'+moment(currentDate).format("YYYY-MM-DD")).then((response)=>{
      setResponse(response.data);
    });
  },[]);

  useEffect(()=>{
    api.get('/appointments/'+moment(currentDate).format("YYYY-MM-DD")).then((response)=>{
      setResponse(response.data);
    });
  },[currentDate]);
  

  return (
    <>
      <div className="align-centre">
        <Card>
          <div className="header">
            <div><h2>{moment(currentDate).format("MMMM Do YYYY")}</h2></div>
            <div className="icon-group">
              <span 
                className="icon"
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentDate((prevDate) =>{
                        if(prevDate>moment(today))
                            return moment(prevDate).subtract(1, "day");
                        else
                            return prevDate;
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
          </div>
        
            <div className="body">
                {
                  response?.map((event)=>
                    <pre>
                    Title {event.title}<br/>
                    Description {event.description}<br/>
                    StartTime {event.startTime}<br/>
                    EndTime {event.endTime}<br/><br/>
                    </pre>
                  )
                }
            </div>
          
          <button className="custom-button-large" onClick={(e)=>{
            e.preventDefault();
            resetSelectedOption(prevSelectedOption);
          }}
          >Back</button>
        </Card>
      </div>
    </>
  );
}
