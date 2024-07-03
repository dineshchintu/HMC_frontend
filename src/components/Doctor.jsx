import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import DoctorTable from './DoctorTable';
import { useEffect } from 'react';
function FilterForm({rows,setRows}){
    let [dateTime,setDateTime] = useState("");
    let [specialization,setSpecialization]=useState("");
    async function checkHandler(){
        try{
            console.log("filterData called");
                let appointmentsResponse = await axios.get("http://localhost:8080/appointments");
                let doctorsResponse = await axios.get("http://localhost:8080/doctors");
                let appointments = appointmentsResponse.data;
                let doctors = doctorsResponse.data;
                console.log("app",appointments)
                console.log("doc",doctors)
                const desiredDateTime = new Date(dateTime);
                console.log(desiredDateTime)
                 // Calculate the time window
                const startWindow = new Date(desiredDateTime.getTime() - 30 * 60 * 1000);
                const endWindow = new Date(desiredDateTime.getTime() + 30 * 60 * 1000);
                  // Create a Set to store unavailable doctors
                const unavailableDoctors = new Set();
                appointments.forEach(appointment => {
                    const appointmentDateTime = new Date(appointment.appointmentDate);
                    if (appointmentDateTime >= startWindow && appointmentDateTime <= endWindow) {
                      unavailableDoctors.add(appointment.doctor.id);
                      console.log(appointment.doctor.id);
                    }
                  });
                doctors = doctors.filter(doctor => !unavailableDoctors.has(doctor.id));
                console.log("AvailableBasedOnTime",doctors);
                doctors=doctors.filter((doctor)=>doctor.specialization.toLowerCase().includes(specialization.toLowerCase()));
                setRows(doctors);
        }
        catch(err){
            console.log(err.message);
        }
    }
    async function clearHandler(){
        try{
            let response = await axios.get("http://localhost:8080/doctors");
            setRows(response.data);
            setDateTime("");
            setSpecialization("");
        }
        catch(err){
            console.log(err.message);
        }
    }
    return (
        <>
         <label htmlFor="appointmentDate">Appointment (date and time):</label>
         <input type="datetime-local" id="appointmentDate" name="appointmentDate" value={dateTime} onChange={(e)=>{setDateTime(e.target.value)}}/>
        <br />
         <TextField
            sx={{marginTop:"20px"}}
            id="specialization"
            variant="outlined"
            label="specialization"
            name="specialization"
            fullWidth
            placeholder="Enter specialization"
            onChange={(e)=>{setSpecialization(e.target.value)}}
            value={specialization}
          />
          <Button onClick={checkHandler}>Check</Button>
          <Button onClick={clearHandler}>Clear</Button>
        </>
    )

}
function Form({formData,setFormData,selectedId,setSelectedId}){
      let handleInputChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        setFormData((prev)=>{
          return {
            ...prev,
            [name]:value
          }
        })  
        }
        const register = async (formData) => {
            try{
                if(selectedId){
                    let response = await axios.put(`http://localhost:8080/doctors/${selectedId}`,formData);
                    console.log(response.data);
                    setSelectedId(null);
                    alert("Doctor Edited succesfully");
                    window.location.reload();
                }
                else{
                    let response = await axios.post('http://localhost:8080/doctors',formData);
                    console.log(response.data);
                    alert("Doctor added successfully");
                    window.location.reload();
                }
                setFormData({firstName:"",lastName:"",specialization:"",contactNumber:""});
            }
            catch(err){
                console.log(err.message);
            }
          }

    return (
        <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Doctor Form</h2>
          <TextField
            id="firstName"
            label="firstName"
            variant="outlined"
            title="firstName"
            name="firstName"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInputChange}
            value={formData.firstName}
          />
          <TextField
            id="lastName"
            variant="outlined"
            label="lastName"
            name="lastName"
            fullWidth
            placeholder="Enter lastName"
            onChange={handleInputChange}
            value={formData.lastName}
          />
          <TextField
            id="specialization"
            variant="outlined"
            label="specialization"
            name="specialization"
            fullWidth
            onChange={handleInputChange}
            value={formData.specialization}
          />
          <TextField
            id="contactNumber"
            variant="outlined"
            label="contactNumber"
            name="contactNumber"
            fullWidth
            onChange={handleInputChange}
            value={formData.contactNumber}
          />
            
          <Button className="button" variant="contained" onClick={()=>{register(formData);}}>
          {selectedId?"Edit":"Add"} Doctor
           </Button>
        </Stack>
      </Box>
    )
}
function Doctor(){
    let initialState = {firstName:"",lastName:"",specialization:"",contactNumber:""};
    let [formData,setFormData]= useState(initialState);
    let [selectedId,setSelectedId]=useState(null);
    const [rows,setRows] = useState([]);


    useEffect(()=>{
        async function fetchData(){
            try{
                console.log("fetchdata called");
                let response = await axios.get("http://localhost:8080/doctors");
                setRows(response.data);
            }
            catch(err){
                console.log(err.message);
            }

        }
        fetchData();
    },[selectedId])
    return (
        <Box sx={{ flexGrow: 1,marginTop:"20px" }}>
        <Grid container spacing={8}>
          <Grid item sm={6} md={6}>
            <Form formData={formData} setFormData={setFormData} setSelectedId={setSelectedId}  selectedId={selectedId} />
            <Button onClick={()=>{setFormData(initialState); setSelectedId(null)}} >ClearForm</Button>
          </Grid>
          <Grid item sm={6} md={6}>
          <FilterForm row={rows} setRows={setRows} />
          </Grid>
          <Grid item sm={12} md={12}>
            <h2>If the doctor has any appointment, delete is not possible</h2>
          <DoctorTable rows={rows} setRows={setRows} formData={formData} setFormData={setFormData} setSelectedId={setSelectedId}  selectedId={selectedId} />
          </Grid>
          
        </Grid>
      </Box>
    )
}

export default Doctor