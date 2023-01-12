import React from "react";
import "./NotifyCard.scss";
import { faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotifyCard({response}){

    console.log(response);
    return (
        <div className="notify-pop-up">
            {response.status === 201 ? <div className="created">Appointment Created <FontAwesomeIcon icon={faCircleCheck}/></div> :
                <div className="error">{response.data.error} <FontAwesomeIcon icon={faCircleExclamation}/></div>
            }

        </div>
    );
}
