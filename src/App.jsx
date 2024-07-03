import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Appointment from './components/Appointment';
import Consultation from './components/Consultation';
function App() {

  return (
    <div className="App">
      <Navbar />
    <Routes>
    <Route path='/doctor' element={<Doctor/>} />
    <Route path='/patient' element={<Patient/>}  />
    <Route  path='/appointment' element={<Appointment />}  />
    <Route path='/consultationNote' element={<Consultation />} />
    <Route  path='/' element={<Home />}  />
    
    </Routes>
  </div>
  )
}

export default App
