import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { timeline } from "./Timeline";
import "./TimelineContainer.scss";

export default function TimelineContainer({toggleCreateEventVisibility}) {
  
  return (
    <>
      {timeline.map((time) => {
        return (
          <div className="timeline">
            <div className="time">
              <div className="start-time">{moment(time.startTime,'HH:mm').format('h a')}</div>
            </div>
            <div className="time-event-space" onClick={(e)=>{
              e.preventDefault();
              toggleCreateEventVisibility();
            }}>
            </div>
          </div>
        );
      })}
    </>
  );
}
