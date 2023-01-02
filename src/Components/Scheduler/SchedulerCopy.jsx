import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import api from "../../Api/appointments";
import Card from "../../Features/Card/Card";
import TimelineTemp from "../../Features/Timeline/TimelineTemp";
import { HomeOptionContext } from "../Home.jsx/HomeOptionContext";
import { AppointmentContext } from "./AppointmentContext";
import { HeaderGroup } from "./HeaderComponents/HeaderGroup";

export default function SchedulerCopy() {

  const {date} = useContext(AppointmentContext);
  const {eventList} = useContext(HomeOptionContext);
  const [currentDate, setCurrentDate] = date;
  const [events, setEvents] = eventList;
  
  const [response, setResponse] = useState([{}]);

  useEffect(() => {
    api
      .get("/appointments?date=" + moment(currentDate).format("YYYY-MM-DD"))
      .then((response) => {
        setResponse(response.data);
      });
  }, []);

  useEffect(() => {
    api
      .get("/appointments?date=" + moment(currentDate).format("YYYY-MM-DD"))
      .then((response) => {
        setResponse(response.data);
      });
  }, [currentDate, events]);

  return (
    <>
      <Card>
        <HeaderGroup />
        <div className="body" style={{ position: "relative" }}>
          <TimelineTemp response={response} />
        </div>
      </Card>
    </>
  );
}
