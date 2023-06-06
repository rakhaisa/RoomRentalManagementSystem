import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
const baseUrl = process.env.REACT_APP_BASE_URL;

const AddMaintenance = () => {
  const [maintenanceID, setMaintenanceID] = useState("");
    const [description, setDescription] = useState("");
    const [maintAmount, setmaintAmount] = useState(""); 
    const [maintDate, setMaintDate] = useState("");  
    const [details, setDetails] = useState("");
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const saveMaintenance = async (e) => {
      e.preventDefault();
      try {
        await axios.post("${baseUrl}/maintenances", {
          maintenanceID,
          description,
          maintAmount,
          maintDate,
          details,
        });
        navigate("/maintenance");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Box m="1.5rem 2.5rem">
      <Header title="MAINTENANCES" subtitle="Add a New Maintenance" />
    <Box
      Box m="38px 40px 20px 40px"
      >
      <form onSubmit={saveMaintenance}>
         <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
        
            <TextField
              label="Maintenance ID"
              fullWidth
              value={maintenanceID}
              onChange={(e) => setMaintenanceID(e.target.value)}
              placeholder="Maintenance ID"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              sx={{ gridColumn: "span 4" }}
            />
        
        
       <TextField
              label="Maintenance Amount"
              fullWidth
              value={maintAmount}
              onChange={(e) => setmaintAmount(e.target.value)}
              placeholder="Maintenance Amount"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
            type="date"
              label="Maintenance Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={maintDate}
              onChange={(e) => setMaintDate(e.target.value)}
              placeholder="Maintenance Date"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Detail"
              fullWidth
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details"
              sx={{ gridColumn: "span 4" }}
            />
            
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </Box>
      </form>
  </Box>
  </Box>
    );
  };
  

export default AddMaintenance
