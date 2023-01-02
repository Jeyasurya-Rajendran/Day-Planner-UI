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
import { AppointmentProvider } from "../Scheduler/AppointmentContext";

export const ACTION = {
    HOME : "home",
    CREATE: "create appointment",
    CHECK: "check appointment",
};

export default function Home() {

    const {option, prevOption} = useContext(HomeOptionContext);
    const [selectedOption, setSelectedOption] = option;
    // const [events, setEvents] = useState([]);

    // function addEvents(event){
    //     setEvents((prevEvents)=>{
    //        return [...prevEvents, event]
    //     });
    // }



    return (
        <>
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
                {selectedOption === ACTION.CREATE && <CreateEvent prevPage={'home'}/>}
                {/* {selectedOption === ACTION.CHECK && <Scheduler prevSelectedOption = {null} resetSelectedOption = {resetSelectedOption} events={events}/>} */}
                {selectedOption === ACTION.CHECK && 
                    <AppointmentProvider>
                        <SchedulerCopy/>
                    </AppointmentProvider>}
            </div>
        </>
    );
}
