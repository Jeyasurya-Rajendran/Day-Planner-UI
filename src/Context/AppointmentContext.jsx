import React, { createContext, useState } from "react";
import moment from "moment";
import appointments from "../Api/appointments";

export const AppointmentContext = createContext("");

export const AppointmentProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(moment().format());
  const [events, setEvents] = useState([]);

  return (
    <AppointmentContext.Provider
      value={{
        date: [currentDate, setCurrentDate],
        appointments : [events, setEvents]
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
};
