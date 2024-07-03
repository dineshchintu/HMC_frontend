import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import Appointment from "./Appointment";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
const Navbar = ({ children, hasHiddenAuthButtons }) => {
  let navigate = useNavigate();
  let doctorHandler = () => {
    navigate("/doctor");
  };
  let patientHandler = () => {
    navigate("/patient");
  };
  let appointmentHandler = () => {
    navigate("/appointment");
  };
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="" alt="HMS-icon"></img>
      </Box>
  
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Button variant="text" onClick={doctorHandler}>
            Doctor
          </Button>
          <Button variant="text" onClick={patientHandler}>
            Patient
          </Button>
          <Button variant="text" onClick={appointmentHandler}>
            Appointments
          </Button>
          <Button variant="text" onClick={()=>{navigate("/consultationNote")}}>Consultation</Button>
        </Stack>
      
    </Box>
  );
};

export default Navbar;