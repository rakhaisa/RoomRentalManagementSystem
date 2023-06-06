import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";

const AddRoom = () => {
  const [rentAmount, setRentAmount] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("TypeA");
  const isNonMobile = useMediaQuery("(min-width:600px)");  
  const navigate = useNavigate();
    const saveRoom = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://https://easykos-backend.onrender.com/rooms", {
          rentAmount,
          roomNo,
          roomType,
        });
        navigate("/rooms");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="ROOMS" subtitle="Add a New Room" />
      <Box
        Box m="38px 40px 20px 40px"
        >
        <form onSubmit={saveRoom}>
           <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
           
           
            
              <TextField
                label="Room Number"
                fullWidth
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                placeholder="Room Number"
                sx={{ gridColumn: "span 4" }}
              />
          
          
         <TextField
                label="Rental Amount"
                fullWidth
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="Rental Amount"
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="TypeA">Type A</MenuItem>
                  <MenuItem value="TypeB">Type B</MenuItem>
                  <MenuItem value="TypeC">Type C</MenuItem>
                  <MenuItem value="TypeD">Type D</MenuItem>
                </Select>
              </FormControl>
              
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
  
export default AddRoom
