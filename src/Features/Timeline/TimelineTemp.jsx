import React, {useState, useEffect} from "react";
import moment from "moment/moment";
import { timeline } from "./Timeline";
import "./TimelineTemp.scss";
import TimeEvents from "../../Components/Scheduler/TimeEvents";

let count = 0;

export default function TimelineTemp({response}){

    return(
        <>
        {timeline.map((time)=>{
            return (
                <div className="timeline">
                    <div className="time">{time.startTime}</div>
                    <div className="">
                        {/* {time.events?.map((event)=>{
                            return (
                                <div></div>
                            )
                        })} */}
                        <div></div>
                    </div>
                </div>
            )
        })}

        <div className="events">
              <TimeEvents response={response}/>
            </div>
        </>

    )
}