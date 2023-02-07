import React, { createContext, useState } from "react";
import moment from "moment";

export const AppointmentContext = createContext("");

export const AppointmentProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format());
  const [events, setEvents] = useState({});
  const [retreiveAppointments , setRetreiveAppointments] = useState(0);

  return (
    <AppointmentContext.Provider
      value={{
        date: [selectedDate, setSelectedDate],
        appointments : [events, setEvents],
        reload: [retreiveAppointments, setRetreiveAppointments]
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
};
