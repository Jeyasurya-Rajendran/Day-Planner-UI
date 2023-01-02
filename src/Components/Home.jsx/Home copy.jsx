import React, { useEffect, useState, useContext } from "react";
import Card from "../../Features/Card/Card";
import Button from "../../Features/Button/CustomButton";
import "./Home.scss";
import avatar from "../../Asserts/avatar.png";
import CreateEvent from "../CreateEvent/CreateEvent";
import Scheduler from "../Scheduler/Scheduler";
import api from '../../Api/appointments';

import SchedulerCopy from "../Scheduler/SchedulerCopy";
import { HomeOptionContext } from "./HomeOptionContext";
import HomeOptionProvider from "./HomeOptionContext";

const ACTION = {
    HOME : "home",
    CREATE: "create appointment",
    CHECK: "check appointment",
};

export default function Home() {

    const [selectedOption, setSelectedOption] = useContext(HomeOptionContext);

    function addEvents(event){

        // const request = event;
        // const response = api.post("/appointments", {
        //     startDateTime: request.startTime,
        //     endDateTime: request.endTime,
        //     title: request.title,
        //     description: request.description
        // });

        // console.log(response.status);

        setEvents((prevEvents)=>{
           return [...prevEvents, event]
        });
        // setEvents((prevEvents)=>{
        //    return [...prevEvents, response.data]
        // });
    }

    return (
        <HomeOptionProvider>
            <div className="align-centre">
                {selectedOption === ACTION.HOME &&
                <Card>
                    <img src={avatar} className="avatar" alt="avatar" />
                    <p>Hello!</p>
                    <button
                        className="custom-button"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedOption(ACTION.CREATE);
                        }}
                    >
                        Create Appointment
                    </button>
                    <button
                        className="custom-button"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedOption(ACTION.CHECK);
                        }}
                    >
                        Check Appointments
                    </button>
                </Card>}
                {selectedOption === ACTION.CREATE && <CreateEvent prevSelectedOption = {null} resetSelectedOption = {resetSelectedOption} addEvents = {addEvents}/>}
                {/* {selectedOption === ACTION.CHECK && <Scheduler prevSelectedOption = {null} resetSelectedOption = {resetSelectedOption} events={events}/>} */}
                {selectedOption === ACTION.CHECK && <SchedulerCopy prevSelectedOption = {null} resetSelectedOption = {resetSelectedOption} events={events}/>}
            </div>
        </HomeOptionProvider>
    );
}
