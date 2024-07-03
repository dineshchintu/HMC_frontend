import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import CustomTable from "./PatientTable";
function Form({formData,setFormData,selectedId,setSelectedId}){
    const handleCheckboxChange = (event) => {
        setFormData({
          ...formData,
          insuranceDetails: event.target.checked,
        });
      };
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
                    let response = await axios.put(`http://localhost:8080/patients/${selectedId}`,formData);
                    console.log(response.data);
                    setFormData({firstName:"",lastName:"",contactNumber:"",insuranceDetails:false})
                    setSelectedId(null);
                    alert("Patient Edited succesfully");
                }
                else{
                    let response = await axios.post('http://localhost:8080/patients',formData);
                    console.log(response.data);
                    setFormData({firstName:"",lastName:"",contactNumber:"",insuranceDetails:false})
                  alert("Patient Added succesfully");
                }
              
            }
            catch(err){
                console.log(err.message);
            }
          }

    return (
        <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Patient Form</h2>
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
            id="contactNumber"
            variant="outlined"
            label="contactNumber"
            name="contactNumber"
            fullWidth
            onChange={handleInputChange}
            value={formData.contactNumber}
          />
          <Box>
            <h4>Insurance</h4>
            <Checkbox checked={formData.insuranceDetails}
        onChange={handleCheckboxChange}></Checkbox>
          </Box>
          <Button className="button" variant="contained" onClick={()=>{register(formData);}}>
            {selectedId?"Edit":"Add"} Patient
           </Button>
        </Stack>
      </Box>
    )
}
function Patient(){
    let initialState={firstName:"",lastName:"",contactNumber:"",insuranceDetails:false};
    let [formData,setFormData]= useState(initialState);
    let [selectedId,setSelectedId]=useState(null);
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={8} md={4}>
            <Form formData={formData} setFormData={setFormData} selectedId={selectedId} setSelectedId={setSelectedId} />
            <Button onClick={()=>{setFormData(initialState); setSelectedId(null)}} >ClearForm</Button>
          </Grid>
          <Grid item sm={12} md={12}>
          <h2>If the patient has any appointment, delete is not possible</h2>
            <CustomTable selectedId={selectedId} formData={formData} setFormData={setFormData} setSelectedId={setSelectedId} />
          </Grid>
          
        </Grid>
      </Box>
    )
}

export default Patient