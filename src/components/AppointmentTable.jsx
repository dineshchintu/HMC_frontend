import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
export default function BasicTable({formData,setFormData,setSelectedId,selectedId,rows,setRows}) {
    console.log("appoinments table");

    async function deleteRow(id){
        try{
            let response = await axios.delete(`http://localhost:8080/appointments/${id}`);
            alert("Appointment deleted succesfully");
            window.location.reload();
        }
        catch(err){
            console.log(err.message);
        }
    }
    function EditHandler(row){
        setFormData({appointmentDate:row.appointmentDate,status:"Rescheduled",patientId:row.patient.id,doctorId:row.doctor.id});
        setSelectedId(row.id);
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>DateAndTime</TableCell>
            <TableCell>PatientId</TableCell>
            <TableCell>PatientName</TableCell>
            <TableCell>DoctorId</TableCell>
            <TableCell>DoctorName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow 
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.appointmentDate.split('T')[0]+" "+row.appointmentDate.split('T')[1]}</TableCell>
              <TableCell >{row.patient.id}</TableCell>
              <TableCell >{row.patient.firstName+" "+row.patient.lastName}</TableCell>
              <TableCell >{row.doctor.id}</TableCell>
              <TableCell >{row.doctor.firstName+" "+row.doctor.lastName}</TableCell>
              <TableCell >
                <Button onClick={()=>{EditHandler(row);}}>Edit</Button>
              </TableCell>
              <TableCell >
              <Button onClick={()=>{deleteRow(row.id)}} >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
