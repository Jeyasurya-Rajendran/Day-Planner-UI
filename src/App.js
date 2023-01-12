import React from 'react';
import './App.css';
import { AppointmentProvider } from './Context/AppointmentContext';
import SchedulerHome from './Components/HomePage/HomePage.jsx';

function App() {
  return (
    <AppointmentProvider>
      <SchedulerHome />
    </AppointmentProvider>
  )
}

export default App;
