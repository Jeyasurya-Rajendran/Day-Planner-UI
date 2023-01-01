import React from "react";
import "./Card.scss";

export default function Card(props){
    return (
        <div className="card-container">
            {props.children}
        </div>
    )
}