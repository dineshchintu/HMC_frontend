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
export default function BasicTable({formData,setFormData,setSelectedId,selectedId}) {
    const [rows,setRows] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            try{
                console.log("fetchdata called");
                let response = await axios.get("http://localhost:8080/patients");
                setRows(response.data);
            }
            catch(err){
                console.log(err.message);
            }

        }
        fetchData();
    },[selectedId])
    async function deleteRow(id){
        try{
            let response = await axios.delete(`http://localhost:8080/patients/${id}`);
            alert("patient deleted succesfully");
            window.location.reload();
        }
        catch(err){
            console.log(err.message);
        }
    }
    function EditHandler(row){
        setFormData({firstName:row.firstName,lastName:row.lastName,contactNumber:row.contactNumber,insuranceDetails:row.insuranceDetails});
        setSelectedId(row.id);
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>ContactNumber</TableCell>
            <TableCell>Insurance</TableCell>
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
              <TableCell >{row.firstName}</TableCell>
              <TableCell >{row.lastName}</TableCell>
              <TableCell >{row.contactNumber}</TableCell>
              <TableCell >{row.insuranceDetails? "Yes":"No"}</TableCell>
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
