import React, { useState } from "react";
import Card from "../../Features/Card/Card";
import Button from "../../Features/Button/CustomButton";
import "./Home.scss";
import avatar from "../../Asserts/avatar.png";
import CreateEvent from "../CreateEvent/CreateEvent";
import Scheduler from "../Scheduler/Scheduler";
import api from '../../Api/appointments';

const ACTION = {
    CREATE: "create appointment",
    CHECK: "check appointment",
};

export default function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [events, setEvents] = useState([]);

    function resetSelectedOption(prevSelectedOption){
        setSelectedOption(prevSelectedOption);
    }

    function addEvents(event){

        const request = event;
        const response = api.post("/appointments", {
            startDateTime: request.startTime,
            endDateTime: request.endTime,
            title: request.title
        });

        setEvents((prevEvents)=>{
           return [...prevEvents, response.data]
        });
    }

    return (
        <>
            <div className="align-centre">
                {selectedOption === null &&
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
                {selectedOption === ACTION.CHECK && <Scheduler prevSelectedOption = {null} resetSelectedOption = {resetSelectedOption} events={events}/>}
            </div>
        </>
    );
}
