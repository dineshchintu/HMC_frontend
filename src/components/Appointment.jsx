import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import AppointmentTable from "./AppointmentTable"
import { useEffect } from 'react';
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
                    let response = await axios.put(`http://localhost:8080/appointments/${selectedId}`,formData);
                    console.log(response.data);
                    alert("Appointment Rescheduled successfully");
                    setSelectedId(null);
                    
                }
                else{
                    let response = await axios.post('http://localhost:8080/appointments',formData);
                    console.log(response.data);
                    alert("Appointment made successfully");
                }
                setFormData({appointmentDate:"",status:"Scheduled",patientId:"",doctorId:""});
                window.location.reload();
            }
            catch(err){
                console.log(err.message);
            }
          }

    return (
        <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Appointment Form</h2>
            <Box>
            <label htmlFor="appointmentDate">Appointment (date and time):</label>
            <input type="datetime-local" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange}/>
            </Box>
          <TextField
            id="patientId"
            variant="outlined"
            label="patientId"
            name="patientId"
            fullWidth
            onChange={handleInputChange}
            value={formData.patientId}
          />
          <TextField
            id="doctorId"
            variant="outlined"
            label="doctorId"
            name="doctorId"
            fullWidth
            onChange={handleInputChange}
            value={formData.doctorId}
          />
            
          <Button className="button" variant="contained" onClick={()=>{register(formData);}}>
            {selectedId?"Edit":"Make"} Appointment
           </Button>
        </Stack>
      </Box>
    )
}
function Appointment(){
    let initialState = {appointmentDate:"",status:"Scheduled",patientId:"",doctorId:""}
    let [formData,setFormData]= useState(initialState);
    let [selectedId,setSelectedId]=useState(null);
    const [rows,setRows] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            try{
                console.log("fetchdata from appointments called");
                let response = await axios.get("http://localhost:8080/appointments");
                setRows(response.data);
            }
            catch(err){
                console.log(err.message);
            }

        }
        fetchData();
    },[selectedId])
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={8} md={8}>
            <h2>Choose the doctor based on Availability(Check in Doctors section)</h2>
            <hr />
            <Form formData={formData} setFormData={setFormData} setSelectedId={setSelectedId}  selectedId={selectedId}  />
            <Button onClick={()=>{setFormData(initialState); setSelectedId(null)}} >ClearForm</Button>
          </Grid>
          <Grid item sm={12} md={12}>
          <AppointmentTable selectedId={selectedId} formData={formData} setFormData={setFormData} setSelectedId={setSelectedId} rows={rows} setRows={setRows} />
          </Grid>
          
        </Grid>
      </Box>
    )
}

export default Appointment