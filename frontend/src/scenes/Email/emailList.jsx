import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, useTheme,} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Send as SendIcon } from "@mui/icons-material";
import axios from "axios";

const MessageList = () => {
    const [messages, setMessage] = useState([]);
    const theme = useTheme();

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = async () => {
    const response = await axios.get("http://localhost:6001/email");
    setMessage(response.data);
  };

  
  const columns = [
   
    { field: 'tenantID', headerName: 'Tenant ID', flex: 0.5, },
    { field: 'email', headerName: 'Email', flex : 0.5, },
    { field: 'category', headerName: 'Category', flex: 0.5, },
    { field: 'messageDate', headerName: 'Date Message', flex : 0.5, 
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  ];

  return (
    <Box m="1.5rem 2.5rem">
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="MESSAGE" subtitle="List of Messages" />
        <Button component={Link} to="/email/add" variant="contained" color="primary">
            Send Message
            <SendIcon sx={{ size: "1rem", ml: "10px"  }} />
        </Button>
     </Box>
    
     <Box
        mt="38px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.white.gading,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.white.linen,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          
        }}
      >
        <DataGrid
           getRowId={(message) => message._id}
          rows={messages}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default MessageList