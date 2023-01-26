import React from "react";
import "./NotifyCard.scss";
import { faCircleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotifyCard({response}){
    let category = '';

    console.log(response);
    
    switch(response.status){
        case 201:
            category = "created";
            break;
        case 204:
            category = "updated";
            break;
        case 400:
            category = "error";
        case 404:
            category = "error";
        case 409:
            category = "error";
    }

    return (
        <div className="notify-pop-up">
            {category === "created" && <div className="created">Appointment Created <FontAwesomeIcon icon={faCircleCheck}/></div>}
            {category === "updated" && <div className="created">Appointment Updated <FontAwesomeIcon icon={faCircleCheck}/></div>}
            {category === "error" && <div className="error">{response.data.error} <FontAwesomeIcon icon={faCircleExclamation}/></div>}
        </div>
    );

            /* <div className="notify-pop-up">
            {response.status === 201 ? <div className="created">Appointment Created <FontAwesomeIcon icon={faCircleCheck}/></div> :
                <div className="error">{response.data.error} <FontAwesomeIcon icon={faCircleExclamation}/></div>
            }
        </div> */
}
