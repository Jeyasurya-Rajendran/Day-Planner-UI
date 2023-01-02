import React from "react";
import "./NotifyCard.scss";
import { faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotifyCard({message}){
    return (
        <div className="notify-pop-up">
            {message.status === 409 && <div className="error">{message.data} <FontAwesomeIcon icon={faCircleExclamation}/></div>}
            {message.status === 400 && <div className="error">{message.data} <FontAwesomeIcon icon={faCircleExclamation}/></div>}
            {message.status === 201 && <div className="created">Appointment Created <FontAwesomeIcon icon={faCircleCheck}/></div>}
        </div>
    );
}
