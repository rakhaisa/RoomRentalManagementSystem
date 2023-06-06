import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import {  TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
const baseUrl = process.env.REACT_APP_BASE_URL;

  
  const AddMessage  = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [tenantID, setTenantID] = useState("");
    const [email, setEmail] = useState("");
    const [messageDate, setMessageDate] = useState("");
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("");
    const [text, setText] = useState("");

   
    const navigate = useNavigate();

    const saveMessage = async (e) => {
      e.preventDefault();
      try {
        await axios.post("${baseUrl}/email", {
          tenantID,
            email,
            messageDate,
            subject,
            category,
            text,
        });
        navigate("/email");
      } catch (error) {
        console.log(error);
      }
    };
     
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Message" subtitle="Send a New Message" />
        <Box
        Box m="38px 40px 20px 40px"
        >
        <form onSubmit={saveMessage}>
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
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                sx={{ gridColumn: "span 2" }}

              />
              
          
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Reminder">Reminder</MenuItem>
                  <MenuItem value="Annoucement">Annoucement</MenuItem>
                </Select>
              </FormControl>
              

              <TextField
                type="date"
                label="Date Send"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={messageDate}
                onChange={(e) => setMessageDate(e.target.value)}
                placeholder="Date Send"
                sx={{ gridColumn: "span 2" }}
              />

                <TextField
                label="Subject"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                sx={{ gridColumn: "span 4" }}
              />

                <TextField
                label="Message"
                fullWidth
                multiline
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Message"
                sx={{ gridColumn: "span 4" }}
              />

             
  
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="primary" variant="contained">
                  Send
                </Button>
              </Box>
        </form>
    </Box>
        
  
      </Box>
    );
  };
  
  

export default AddMessage
