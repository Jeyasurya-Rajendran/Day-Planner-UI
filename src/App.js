import React from 'react';
import './App.css';
import Home from './Components/Home.jsx/Home';
import Scheduler from './Components/Scheduler/Scheduler';
import CreateEvent from './Components/CreateEvent/CreateEvent';

function App() {
  return (
    <>
      <Home />
      <Scheduler />
      <CreateEvent />
    </>
  );
}

export default App;
