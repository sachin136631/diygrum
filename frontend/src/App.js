import React, { useState } from 'react';
import Input from './pages/Input';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Visualiser from './pages/Visualiser';

const App = () => {
  const [resp,respsetter]=useState("");
  return (
    <div>
      <h1> welcome to the trial version</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Input respsetter={respsetter}/>}/>
          <Route path="/visualiser" element={<Visualiser resp={resp}/>}/>  
        </Routes>      
      </Router>

    </div>
  )
}

export default App
