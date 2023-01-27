import React, { useContext, useEffect, useState, useReducer } from "react";
import moment from "moment";
import Card from "../../Features/Card/Card";
import ConfirmPopup from "../../Features/ConfirmationCard/ConfirmPopup";
import { getRoutines, deleteRoutine } from "../../Api/apiCalls";
import { AppointmentContext } from "../../Context/AppointmentContext";
import NotFoundImg from "../../Asserts/not found.png";
import "./Routines.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { reducer } from "../Scheduler/Events/Events";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const { appointments, reload } = useContext(AppointmentContext);
  const [events, setEvents] = appointments;
  const [retreiveAppointments, setRetreiveAppointments] = reload;
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState({});
  const [state, dispatch] = useReducer(reducer, {
    eventInfoClicked: false,
    deleteEvent: {},
    event: {},
  });

  useEffect(() => {
    getRoutines().then((routines) => {
      setRoutines(routines.data);
    });
  },[events,retreiveAppointments]);

  useEffect(() => {
    if (state.deleteEvent) {
      deleteRoutine(state.deleteEvent.id)
      .then(()=>{
        setRetreiveAppointments((prevLoad)=>{
          return prevLoad+1;
        })
      });
    }
  }, [state.deleteEvent]);

  function CancelConfirmation(){
    setIsConfirmationPopupVisible(false);
  }
  return (
    <>
      <Card>
      <div className="routines-section">
        <div className="routines-header">Routines</div>
        {routines?.length == 0 ?
          <div className="no-routines">
            <div>No Routines</div>
            <img className="not-found-img" src={NotFoundImg}/>
          </div> :
          <div className="routines-container">
          {routines?.map((routine) => {
              return (
                <div className="routine-card">
                  <div className="routine-header">
                    <div className="routine-title">{routine.title}</div>
                    <div className="routine-delete-icon" onClick={()=>{
                      setSelectedRoutine(routine);
                      setIsConfirmationPopupVisible(true);
                    }}><FontAwesomeIcon icon={faTrash} /></div>
                  </div>
                  <div>
                    {routine.startTime.substring(0,5)} - {routine.endTime.substring(0,5)}
                  </div>
                </div>
              );
            })}
          </div>
        }
        </div>
      </Card>

      {isConfirmationPopupVisible && (
        <ConfirmPopup
          message={"Do you want to delete?"}
          cancel={CancelConfirmation}
          event = {selectedRoutine}
          dispatch={dispatch}
          type='delete'
        />
      )}
    </>
  );
}
