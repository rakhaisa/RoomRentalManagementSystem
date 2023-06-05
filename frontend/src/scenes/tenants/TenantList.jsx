import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, useTheme,} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import axios from "axios";


const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const theme = useTheme();

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = async () => {
    try {
      const response = await axios.get("http://localhost:6001/tenants");
      setTenants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTenant = async (id) => {
    try {
      await axios.delete(`http://localhost:6001/tenants/${id}`);
      getTenants();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: 'tenantID', headerName: 'Tenant ID', flex: 0.5, },
    { field: 'name', headerName: 'Name', flex : 0.8, },
    { field: 'email', headerName: 'Email', flex: 1, },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 0.5, },
    { field: 'roomNo', headerName: 'Room No', flex : 0.5, },
    { field: 'departureDate', headerName: 'Departure Date', flex : 0.8,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }, },
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
    onClick={() => deleteTenant(params.row._id)}
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
        <Header title="TENANTS" subtitle="List of Tenants" />
        <Button component={Link} to="/tenants/add" variant="contained" color="primary">
           <AddIcon sx={{ size: "1rem" }} />
            Add Tenant
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
           getRowId={(tenants) => tenants._id}
          rows={tenants}
          columns={columns}
        />
      </Box>
    </Box>
  );
};


export default TenantList;
