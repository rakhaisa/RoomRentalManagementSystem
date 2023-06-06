import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box,useTheme } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";



const EditPayment = () => {
    const [tenantID, setTenantID] = useState("");
    const [rentId, setRentId] = useState("");
    const [rentAmount, setRentAmount] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [paymentType, setPaymentType] = useState("Cash");  
    const [paymentDate, setPaymentDate] = useState("");  
    const [period, setPeriod] = useState("Januari");
    const navigate = useNavigate();
    const [roomNumbers, setRoomNumbers] = useState([]);
    const {id} = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    useEffect(() => {
      getPaymentById();
      fetchRoomNumbers();
    }, []);

    const fetchRoomNumbers = async () => {
      try {
        const response = await axios.get("http://https://easykos-backend.onrender.com/rooms");
        const availableRooms = response.data.filter(room => room.status === 'Unavailable');
        const numbers = availableRooms.map(room => room.roomNo);
        setRoomNumbers(numbers);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPaymentById = async () => {
      const response = await axios.get(`http://https://easykos-backend.onrender.com/payment/${id}`);
      setTenantID(response.data.tenantID);
      setRentId(response.data.rentId);
      setPaymentType(response.data.paymentType);
      setPaymentDate(response.data.paymentDate);
      setRentAmount(response.data.rentAmount);
      setRoomNo(response.data.roomNo);
      setPeriod(response.data.period);
    };

  
    const updatePayment = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:6001/payments/${id}`, {
          tenantID,
          rentId,
          rentAmount,
          roomNo,
          paymentType,
          paymentDate,
          period,
        
        });
        navigate("/payments");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Box m="1.5rem 2.5rem">
      <Header title="Payment" subtitle="Edit a Payment" />
      <Box
      Box m="38px 40px 20px 40px"
      >
      <form onSubmit={updatePayment}>
         <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
         
            <TextField
              label="Tenant ID"
              fullWidth
              value={tenantID}
              onChange={(e) => setTenantID(e.target.value)}
              placeholder="Tenant ID"
              sx={{ gridColumn: "span 2" }}
            />
          
            <TextField
              label="Rental Amount"
              fullWidth
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
              placeholder="Rental Amount"
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
        
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Transfer">Transfer</MenuItem>
              </Select>
            </FormControl>
            

            <TextField
              type="date"
              label="Payment Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              placeholder="Payment Date"
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl fullWidth>
              <InputLabel>Period</InputLabel>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="May">May</MenuItem>
                <MenuItem value="June">June</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="August">August</MenuItem>
                <MenuItem value="September">September</MenuItem>
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
                <MenuItem value="December">December</MenuItem>
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


  

export default EditPayment;
