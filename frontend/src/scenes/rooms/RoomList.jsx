import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, useTheme,} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import axios from "axios";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const theme = useTheme();

  useEffect(() => {
    getRooms();
  }, []);



const getRooms = async () => {
  try {
    const response = await axios.get("http://https://easykos-backend.onrender.com/rooms");
    setRooms(response.data);
  } catch (error) {
    console.log(error);
  }
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});


  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://https://easykos-backend.onrender.com/rooms/${id}`);
      getRooms();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: 'tenantID', headerName: 'Tenant ID', flex: 0.5, },
    { field: 'roomNo', headerName: 'Room No', flex: 1, },
    { field: 'roomType', headerName: 'Room Type', flex: 0.8, },
    { field: 'rentAmount', headerName: 'Rent Amount', flex: 0.8, valueGetter: (params) => currencyFormatter.format(params.value) },
    { field: 'status', headerName: 'Status', flex: 0.5, },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params) => (
        <>
          <Link
    to={`edit/${params.row._id}`}
    component={IconButton}
    color="info"
    size="small"
  >
    <EditIcon />
  </Link>
  <IconButton
    onClick={() => deleteRoom(params.row._id)}
    color="error"
    size="small"
  >
    <DeleteIcon />
  </IconButton>
        </>
      ),
    },
  ];


  return (
    <Box m="1.5rem 2.5rem">
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="ROOMS" subtitle="List of Rooms" />
        <Button component={Link} to="/rooms/add" variant="contained" color="primary">
           <AddIcon sx={{ size: "1rem" }} />
            Add Room
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
           getRowId={(rooms) => rooms._id}
          rows={rooms}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default RoomList
