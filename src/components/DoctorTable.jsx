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
export default function DoctorTable({formData,setFormData,setSelectedId,selectedId,rows,setRows}) {

    async function deleteRow(id){
        try{
            let response = await axios.delete(`http://localhost:8080/doctors/${id}`);
            alert("doctor deleted succesfully");
            window.location.reload();
        }
        catch(err){
            console.log(err.message);
        }
    }
    function EditHandler(row){
        setFormData({firstName:row.firstName,lastName:row.lastName,specialization:row.specialization,contactNumber:row.contactNumber});
        setSelectedId(row.id);
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>specialization</TableCell>
            <TableCell>contactNumber</TableCell>
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
              <TableCell >{row.firstName+" "+row.lastName}</TableCell>
              <TableCell >{row.specialization}</TableCell>
              <TableCell >{row.contactNumber}</TableCell>
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
