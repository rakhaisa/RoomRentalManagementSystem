import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";

const EditTenant = () => {
    const [tenantID, setTenantID] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [occupation, setOccupation] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [departureDate, setDepartureDate] = useState("");
    const [rentAmount, setRentAmount] = useState("");
    const [roomNo, setRoomNo] = useState("");  
    const [roomNumbers, setRoomNumbers] = useState([]);  
    const [status, setStatus] = useState("Active");
    const navigate = useNavigate();
    const {id} = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    
    useEffect(() => {
      getTenantById();
      fetchRoomNumbers();
    }, []);
  
    const getTenantById = async () => {
      const response = await axios.get(`http://https://easykos-backend.onrender.com/tenants/${id}`);
      setTenantID(response.data.tenantID);
      setName(response.data.name);
      setDob(response.data.dob);
      setAddress(response.data.address);
      setOccupation(response.data.occupation);
      setPhoneNumber(response.data.phoneNumber);
      setDepartureDate(response.data.departureDate);
      setRentAmount(response.data.rentAmount);
      setRoomNo(response.data.roomNo);
      setEmail(response.data.email);
      setGender(response.data.gender);
    };

    const fetchRoomNumbers = async () => {
      try {
        const response = await axios.get("http://https://easykos-backend.onrender.com/rooms");
        const availableRooms = response.data.filter(room => room.status === 'Available');
        const numbers = availableRooms.map(room => room.roomNo);
        setRoomNumbers(numbers);
      } catch (error) {
        console.log(error);
      }
    };
  
    const updateTenant = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:6001/tenants/${id}`, {
          name,
          tenantID,
          phoneNumber,
          dob,
          address,
          occupation,
          departureDate,
          rentAmount,
          roomNo,
          status,
          email,
          gender,
        });
        navigate("/tenants");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
     <Box m="1.5rem 2.5rem">
        <Header title="TENANTS" subtitle="Edit a Tenant" />
      <Box
        Box m="38px 40px 20px 40px"
        >
         <form onSubmit={updateTenant}>
           <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
           
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                sx={{ gridColumn: "span 2" }}
              />
            
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                sx={{ gridColumn: "span 2" }}
              />
          
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="date"
                label="Date of Birth"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
              type="date"
                label="Departure Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                placeholder="Departure Date"
                sx={{ gridColumn: "span 2" }}
              />
           
              <TextField
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                sx={{ gridColumn: "span 2" }}
              />
         
              <TextField
                label="Occupation"
                fullWidth
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Occupation"
                sx={{ gridColumn: "span 2" }}
              />
        
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                sx={{ gridColumn: "span 2" }}
              />
            
          
            <FormControl fullWidth>
                <InputLabel>Room Number</InputLabel>
                <Select
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                  >
                  {roomNumbers.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

                {/* Rent Amount 
            <Typography variant="subtitle1" sx={{ gridColumn: "span 2" }}>Rent Amount: {rentAmount}</Typography>
         */}
         <TextField
                label="Rental Amount"
                fullWidth
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="Rental Amount"
                sx={{ gridColumn: "span 2" }}
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
  

export default EditTenant;
