import React, { createContext,useState } from "react";
import moment from "moment";

export const AppointmentContext = createContext("");

export const AppointmentProvider = ({children})=>{
    const [currentDate, setCurrentDate] = useState(moment().format());
    const [isChangeDate, setIsChangeDate] = useState(false);


    return(
        <AppointmentContext.Provider  value={{date:[currentDate,setCurrentDate], changeDate:[isChangeDate,setIsChangeDate]}}>
            {children}
        </AppointmentContext.Provider>
    )
}