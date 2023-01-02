import React from 'react';
import './App.css';
import Home from './Components/Home.jsx/Home';
import Scheduler from './Components/Scheduler/Scheduler';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import HomeOptionProvider from './Components/Home.jsx/HomeOptionContext';

function App() {
  return (
    <HomeOptionProvider>
      <Home />
    </HomeOptionProvider>
  );
}

export default App;
