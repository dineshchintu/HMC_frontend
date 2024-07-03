import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
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
                    console.log(formData);
                    let response = await axios.post(`http://localhost:8080/consultation-notes/doctor/${formData.doctorId}/patient/${formData.patientId}`,{note:formData.note});
                    console.log(response.data);
                    setFormData({doctorId:"",patientId:"",note:""})
                    alert("Note Added succesfully");
              
            }
            catch(err){
                console.log(err.message);
            }
          }

    return (
        <Box className="content" style={{width:"50vw"}}>
        <Stack spacing={2} className="form">
          <h2 className="title">Add Note to your patient</h2>
          <TextField
            id="doctorId"
            label="doctorId"
            variant="outlined"
            title="doctorId"
            name="doctorId"
            placeholder="Enter Doctor Id"
            fullWidth
            onChange={handleInputChange}
            value={formData.doctorId}
          />
          <TextField
            id="patientId"
            variant="outlined"
            label="patientId"
            name="patientId"
            fullWidth
            placeholder="Enter Patient Id"
            onChange={handleInputChange}
            value={formData.patientId}
          />
  <p><label htmlFor="note">Add Note here:</label></p>
  <textarea id="note" name="note" rows="5" cols="50" onChange={handleInputChange} value={formData.note}>

  </textarea>
          <Button className="button" variant="contained" onClick={()=>{register(formData);}}>
            Add Note
           </Button>
        </Stack>
      </Box>
    )
}
function Consultation(){
    let initialState={doctorId:"",patientId:"",note:""};
    let [formData,setFormData]= useState(initialState);
    let [selectedId,setSelectedId]=useState(null);
    return (
        <Form formData={formData} setFormData={setFormData} selectedId={selectedId} setSelectedId={setSelectedId} />
    )
}

export default Consultation